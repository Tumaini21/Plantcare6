import emailjs from '@emailjs/browser';
import { validatedEmailConfig } from '../config/email';

interface SendEmailParams {
  to_email: string;
  reset_link: string;
}

export class EmailError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'EmailError';
  }
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  if (!validatedEmailConfig.publicKey) {
    throw new EmailError('Email service is not properly configured');
  }

  const resetToken = crypto.randomUUID();
  const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  const templateParams: SendEmailParams = {
    to_email: email,
    reset_link: resetLink,
  };

  try {
    await emailjs.send(
      validatedEmailConfig.serviceId,
      validatedEmailConfig.templateId,
      templateParams,
      validatedEmailConfig.publicKey
    );
  } catch (error) {
    throw new EmailError('Failed to send password reset email', error);
  }
}