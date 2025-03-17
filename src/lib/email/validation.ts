import { z } from 'zod';

export const emailConfigSchema = z.object({
  serviceId: z.string().min(1, 'EmailJS Service ID is required'),
  templateId: z.string().min(1, 'EmailJS Template ID is required'),
  publicKey: z.string().min(1, 'EmailJS Public Key is required'),
}).strict();

export const emailParamsSchema = z.object({
  to_email: z.string().email('Invalid email address'),
  reset_link: z.string().url('Invalid reset link'),
}).strict();

export const sendEmailOptionsSchema = z.object({
  to: z.string().email('Invalid email address'),
  templateParams: z.record(z.unknown()),
}).strict();