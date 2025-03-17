import { z } from 'zod';

const emailConfigSchema = z.object({
  serviceId: z.string().optional().default(''),
  templateId: z.string().optional().default(''),
  publicKey: z.string().optional().default(''),
});

// Default to empty strings if env vars are not available
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Parse with optional fields
export const validatedEmailConfig = emailConfigSchema.parse(emailConfig);

// Helper function to check if email service is properly configured
export function isEmailConfigured(): boolean {
  return Boolean(
    validatedEmailConfig.serviceId &&
    validatedEmailConfig.templateId &&
    validatedEmailConfig.publicKey
  );
}