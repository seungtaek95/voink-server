import { NextFunction, Request, Response } from 'express';

export function errorHandler() {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  };
}