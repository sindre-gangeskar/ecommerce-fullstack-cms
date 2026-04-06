import { createAndThrowHttpError } from "@/helpers/utils";
import { resendAPIKey, resendEmail } from "helpers/envVariables";
import { Resend } from "resend";

const resend = new Resend(resendAPIKey);

export default class EmailService {
  static async sendEmail(email: string, url: string) {
    const { data, error } = await resend.emails.send({
      from: resendEmail, to: email, subject: 'Login', html: `
      <p>Click the link underneath to finish your login process.</p>
      <a href="${url}">Click here to log in</a>
      </br>
      <hr/>
      <p>or copy the link underneath and paste in your browser</p>
      <p>${url}</p>
      `
    });
    if (error) createAndThrowHttpError({ message: "Failed to send email", state: "error", status: 500, name: "SendEmailError" })
    return data;
  }
}