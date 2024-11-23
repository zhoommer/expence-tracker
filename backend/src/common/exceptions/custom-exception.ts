export class CustomException extends Error {
  public readonly statusCode: number;
  public readonly errorDetails?: any;

  constructor(message: string, statusCode: number, errorDetails?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
