import { resendAPIKey, resendEmail } from "helpers/envVariables";
import { Resend } from "resend";

const resend = new Resend(resendAPIKey);

export default class EmailService {
  static async sendEmail(email: string) {
    const { data, error } = await resend.emails.send({ from: resendEmail, to: email, subject: 'Hello', html: "<p>Test email</p>" });
    return { data, error };
  }
}