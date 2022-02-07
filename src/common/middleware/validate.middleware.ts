import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/util';

export interface Constructable {
  new (): any;
}

export function validateBody(targetDto: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(targetDto, req.body);
    validate(dto, { stopAtFirstError: true }).then(error => {
      if (error.length > 0) {
        return next(new HttpError(Object.values(error[0].constraints)[0], 400));
      }
      next();
    });
  };
}
