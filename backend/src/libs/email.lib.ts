import getEnvVar from 'env/index';
import { ISendEmail } from 'interfaces/libs';
import nodemailer, { Transporter } from 'nodemailer';
// import fs from 'fs';
// import path from 'path';

export class Email {
  #transporter: Transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: getEnvVar('SMTP_HOST'),
      port: parseInt(getEnvVar('SMTP_PORT'), 10),
      secure: true,
      requireTLS: true,
      auth: {
        user: getEnvVar('SMTP_HOST_USER'),
        pass: getEnvVar('SMTP_HOST_PASSWORD'),
      },
    });
  }

  // private readFile(fileName: string): string {
  //   const filePath = path.join(__dirname, '..', '..', 'templates', fileName);
  //   const data = fs.readFileSync(filePath, 'utf8');
  //   return data;
  // }

  async sendEmail({ name, email, inviteId, data, eventId }: ISendEmail): Promise<void> {
    const info = await this.#transporter.sendMail({
      from: 's474996633@gmail.com',
      to: email,
      subject: 'Invitation', // Todo: Change it later
      text: `You have been invited to be a ${data.role}`,
      html: `
                 <p>Hi ${name}</p>
                 <p>Click the button below:</p>
      <div style="text-align: center;">
        <a href="${getEnvVar('CLIENT_URL')}/invite/${inviteId}?role=${data.role}&event=${eventId}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Click me</a>
      </div>
            `,
    });

    console.log('Invite sent: %s', info);
  }
}

const emailService = new Email();
export default emailService;
