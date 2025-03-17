import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeEmailService } from './lib/email/config';
import { initializeReminderChecker } from './lib/reminders/checker';
import { requestNotificationPermission } from './lib/notifications/permission';

// Initialize services
async function initialize() {
  try {
    initializeEmailService();
    initializeReminderChecker();
    await requestNotificationPermission();
  } catch (error) {
    console.error('Failed to initialize services:', error);
  }
}

initialize();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);