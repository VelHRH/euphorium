import { ZodError } from 'zod';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(
    message?: string,
    public readonly zodError?: ZodError,
  ) {
    super('Validation', message);
  }
}
