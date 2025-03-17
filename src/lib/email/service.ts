import emailjs from '@emailjs/browser';
import { getEmailConfig } from './config';
import { EmailError } from './errors';
import { SendEmailOptions } from './types';
import { sendEmailOptionsSchema } from './validation';

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  try {
    // Validate input parameters
    const validatedOptions = sendEmailOptionsSchema.parse(options);
    
    const config = getEmailConfig();
    
    // Only attempt to send if we have all required config
    if (!config.serviceId || !config.templateId || !config.publicKey) {
      console.warn('Email service not configured - skipping email send');
      return;
    }

    await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        ...validatedOptions.templateParams,
        to_email: validatedOptions.to,
      },
      config.publicKey
    );
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError('Failed to send email', error);
  }
}