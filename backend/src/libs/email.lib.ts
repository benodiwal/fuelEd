import getEnvVar from 'env/index';
import { ISendEmail } from 'interfaces/libs';
import nodemailer, { Transporter } from 'nodemailer';

class Email {
  #transporter: Transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: getEnvVar('SMTP_HOST'),
      port: parseInt(getEnvVar('SMTP_PORT'), 10),
      secure: false,
      requireTLS: true,
      auth: {
        user: getEnvVar('SMTP_HOST_USER'),
        pass: getEnvVar('SMTP_HOST_PASSWORD'),
      },
    });
  }

  async sendEmail({ email, inviteId, data, eventId }: ISendEmail): Promise<void> {
    const info = await this.#transporter.sendMail({
      from: 'sachinbeniwal0101@gmail.com',
      to: email,
      subject: "Invitation", // Todo: Change it later
      text: `You have been invited to be a ${data.role}`, 
      html: `
                 <p>Hi there!!</p>
                 <p>Click the button below:</p>
      <div style="text-align: center;">
        <a href="http://localhost:3000/events/${eventId}/invite/${inviteId}?role=${data.role}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Click me</a>
      </div>
            `,
    });

    console.log('Invite sent: %s', info);
  }

}

const emailService = new Email();
export default emailService;
