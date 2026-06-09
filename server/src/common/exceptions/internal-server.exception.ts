import { BaseException } from './base.exception';

export class InternalServerException extends BaseException {
  constructor(message?: string) {
    super('Internal Server Error', message);
  }
}
