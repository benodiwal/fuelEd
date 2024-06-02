import getEnvVar from 'env/index';
import { OAuth2Client } from 'google-auth-library';
import { calendar_v3, google } from 'googleapis';
import { CalenderEvent } from 'types/calender.types';

class GoogleCalender {
  #oauth2Client: OAuth2Client;
  #calender: calendar_v3.Calendar;
  #SCOPES: string[];

  constructor() {
    this.#oauth2Client = new google.auth.OAuth2({
      clientId: getEnvVar('GOOGLE_CALENDER_OAUTH_CLIENT_ID'),
      clientSecret: getEnvVar('GOOGLE_CALENDER_OAUTH_CLIENT_SECRET'),
      redirectUri: getEnvVar('GOOGLE_CALENDER_OAUTH_REDIRECT_URI'),
    });
    this.#calender = google.calendar({ version: 'v3', auth: this.#oauth2Client });
    this.#SCOPES = [getEnvVar('GOOGLE_CALENDER_OAUTH_SCOPE') as string];
  }

  generateAuthUrl(): string {
    const authUrl = this.#oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.#SCOPES,
    });
    return authUrl;
  }

  async getToken(code: string) {
    try {
      const { tokens } = await this.#oauth2Client.getToken(code);
      this.#oauth2Client.setCredentials(tokens);
    } catch (e) {
      console.error(e);
    }
  }

  async addEvent(summary: string, description: string, start: string, end: string) {
    const timeZone = getEnvVar('GOOGLE_CALENDER_TIMEZONE') as string;

    const event: CalenderEvent = {
      summary: summary,
      description: description,
      start: {
        dateTime: new Date(start).toISOString(),
        timeZone,
      },
      end: {
        dateTime: new Date(end).toISOString(),
        timeZone,
      },
    };

    try {
      const response = this.#calender.events.insert(
        {
          auth: this.#oauth2Client,
          calendarId: 'primary',
          requestBody: event,
        },
        (err: any, result: any) => { //Todo
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        },
      );
      console.log('Event Created: ', response);
      return response;
    } catch (e) {
      console.error('Error adding event: ', e);
    }
  }
}

const googleCalender = new GoogleCalender();
export default googleCalender;
