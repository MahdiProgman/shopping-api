import { AppError } from 'src/core/app/exceptions/app-error.exception';

export class EmailIsInvalidError extends AppError {
  constructor() {
    super(400, 'the provided email is not valid', 'EMAIL_IS_NOT_VALID');
  }
}
