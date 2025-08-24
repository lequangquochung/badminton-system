import { HttpStatusCode } from '../utils/httpStatusCode.util';

export class CustomError extends Error {
  public status: HttpStatusCode;

  constructor(status: HttpStatusCode, message: string) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Invalid request') {
    super(HttpStatusCode.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(HttpStatusCode.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(HttpStatusCode.FORBIDDEN, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not found') {
    super(HttpStatusCode.NOT_FOUND, message);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'Internal server error') {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}
