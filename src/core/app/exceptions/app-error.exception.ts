export class AppError extends Error {
  public readonly status_code: number;
  public readonly message: string;
  public readonly error_code: string;

  constructor(status_code: number, message: string, error_code: string) {
    super(message);

    this.status_code = status_code;
    this.message = message;
    this.error_code = error_code;
  }
}
