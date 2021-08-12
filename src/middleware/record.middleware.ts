import { NextFunction, Response } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { Record } from '../model/record/record.entity';

export function attachRecord() {
  return (req: RequestWithData<Record>, res: Response, next: NextFunction) => {
    req.data = { filename: 'foo.m4a' } as Record;
    next();
  };
}