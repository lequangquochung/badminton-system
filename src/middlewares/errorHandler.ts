import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/errors';
import { HttpStatusCode } from '../utils/httpStatusCode.util';

export function errorHandler(
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status =
    err instanceof CustomError
      ? err.status
      : HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "An error has occurred. Please try again later";
  res.status(status).json({ success: false, message });
}
