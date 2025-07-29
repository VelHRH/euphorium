export class BaseException extends Error {
  constructor(name: string, message?: string) {
    super(`${name}${message !== undefined ? `: ${message}` : ''}`);
    this.name = name;

    // Capture stack trace and maintain proper prototype chain
    Error.captureStackTrace(this, this.constructor);
  }
}
