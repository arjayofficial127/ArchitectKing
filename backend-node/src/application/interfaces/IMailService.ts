export interface MailAttachment {
  filename: string;
  /** Base64-encoded file content */
  content: string;
}

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  attachments?: MailAttachment[];
}

export interface IMailService {
  /** Sends an email. Returns false (never throws) when sending is unavailable or fails. */
  send(message: MailMessage): Promise<boolean>;
}
