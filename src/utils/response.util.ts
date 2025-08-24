import { Response } from 'express';
import { HttpStatusCode } from './httpStatusCode.util';

export const sendSuccess = (
  res: Response,
  statusCode: HttpStatusCode = HttpStatusCode.OK,
  data: [] | {},
  msg?: string
) => {
  res.status(statusCode).json({
    data,
    message: msg,
    statusCode: statusCode
  });
};
