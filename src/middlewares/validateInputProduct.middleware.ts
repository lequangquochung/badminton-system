import { NextFunction, Request, Response } from 'express';
import { createProductDTO } from '../dtos/product.dto';
import { BadRequestError } from '../error/errors';

export const validateInputProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createProductDTO.validate(req.body, { abortEarly: false });

  if (error) {
    throw new BadRequestError('Invalid data: ' + error.message);
  } else {
    next();
  }
};
