import { NextFunction, Request, Response } from 'express';

export function errorHandler() {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.json(500).json(error);
  };
}