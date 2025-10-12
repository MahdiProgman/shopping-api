import { AppError } from 'src/core/app/exceptions/app-error.exception';

export class EmailIsNotSupportedError extends AppError {
  constructor() {
    super(422, 'the email domain is not supported', 'EMAIL_IS_NOT_SUPPORTED');
  }
}
