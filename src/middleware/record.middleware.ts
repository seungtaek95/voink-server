import { NextFunction, Response } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { Record } from '../model/record/record.entity';
import { RecordService } from '../service/record.service';
import container from '../utils/container';

export function attachRecord() {
  return async (req: RequestWithData<Record>, res: Response, next: NextFunction) => {
    const recordService = container.get(RecordService);
    try {
      const recordId = req.params.id;
      const record = await recordService.findById(recordId);
      req.data = record;
      next();
    } catch (error) {
      next(error);
    }
    next();
  };
}