export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    if (details) this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details) {
    super(400, message, details);
  }
}
 