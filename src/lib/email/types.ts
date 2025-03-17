export interface EmailParams {
  to_email: string;
  reset_link: string;
}

export interface SendEmailOptions {
  to: string;
  templateParams: Record<string, unknown>;
}