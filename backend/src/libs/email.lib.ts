import getEnvVar from 'env/index';
import { ISendEmail } from 'interfaces/libs';
import nodemailer, { Transporter } from 'nodemailer';

export default class Email {
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

  async sendEmail({ email, inviteId, data, token }: ISendEmail): Promise<void> {
    const info = await this.#transporter.sendMail({
      from: 'sachinbeniwal0101@gmail.com',
      to: email,
      subject: data.subject,
      text: `ou have been invited for of ${data.role}`,
      html: `
                 <p>Hello world?</p>
                 <p>Click the button below:</p>
      <div style="text-align: center;">
        <a href="http://localhost:3000/workspace/invite/${inviteId}?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Click me</a>
      </div>
            `,
    });

    console.log('Invite sent: %s', info);
  }

}
