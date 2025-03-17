import emailjs from '@emailjs/browser';
import { emailConfigSchema } from './validation';
import { EmailError } from './errors';

// Default to empty strings if env vars are not available
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

let isInitialized = false;

function validateConfig() {
  // Only validate if all values are present
  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    return emailConfig;
  }

  try {
    return emailConfigSchema.parse(emailConfig);
  } catch (error) {
    console.warn('Email service not properly configured - some features may be limited');
    return emailConfig;
  }
}

export function initializeEmailService() {
  if (isInitialized) return;
  
  try {
    const config = validateConfig();
    if (config.publicKey) {
      emailjs.init(config.publicKey);
    }
    isInitialized = true;
  } catch (error) {
    console.warn('Email service initialization skipped - some features may be limited');
  }
}

export function getEmailConfig() {
  if (!isInitialized) {
    initializeEmailService();
  }
  return validateConfig();
}