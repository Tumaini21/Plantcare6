import { sendEmail } from './service';
import { EmailError } from './errors';

export async function sendPasswordResetEmail(email: string): Promise<void> {
  try {
    const resetToken = crypto.randomUUID();
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    await sendEmail({
      to: email,
      templateParams: {
        reset_link: resetLink,
      },
    });
  } catch (error) {
    throw new EmailError(
      'Failed to send password reset email. Please check your email configuration.',
      error
    );
  }
}