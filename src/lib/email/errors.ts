export class EmailError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'EmailError';
  }
}