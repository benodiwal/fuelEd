import { CustomError } from 'errors/custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Route not found';

  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.reason }];
  }
}
