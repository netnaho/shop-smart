export default class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Ensure the name of the error is the same as the class name
    this.name = this.constructor.name;
    // Capture stack trace if supported
    Error.captureStackTrace(this, this.constructor);
  }
}
