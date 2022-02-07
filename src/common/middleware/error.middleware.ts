import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/util';

export function errorHandler() {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof HttpError) {
      return res.status(error.code).json({
        message: error.message
      });
    }
    res.status(500).json({
      message: error.message
    });
  };
}