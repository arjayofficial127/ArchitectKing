import { injectable } from 'tsyringe';
import { IMailService, MailMessage } from '../../../application/interfaces/IMailService';

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Mail delivery via the Resend HTTP API (no SDK dependency).
 * Degrades gracefully: without RESEND_API_KEY every send is a logged no-op,
 * so local/dev environments work without mail credentials.
 */
@injectable()
export class ResendMailService implements IMailService {
  private readonly apiKey = process.env.RESEND_API_KEY || '';
  private readonly from = process.env.MAIL_FROM || 'Arvin Jayson Castro <onboarding@resend.dev>';

  async send(message: MailMessage): Promise<boolean> {
    if (!this.apiKey) {
      console.log(`[Mail] RESEND_API_KEY not set - skipped email to ${message.to}: "${message.subject}"`);
      return false;
    }

    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.from,
          to: [message.to],
          subject: message.subject,
          html: message.html,
          attachments: message.attachments?.map((a) => ({
            filename: a.filename,
            content: a.content,
          })),
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        console.error(`[Mail] Resend responded ${response.status} for "${message.subject}": ${body.slice(0, 300)}`);
        return false;
      }
      return true;
    } catch (error: any) {
      console.error(`[Mail] Failed to send "${message.subject}": ${error?.message || error}`);
      return false;
    }
  }
}
