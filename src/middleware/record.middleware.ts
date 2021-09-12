import { NextFunction, Response } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { RecordDto } from '../model/record/dto/record.dto';
import { RecordService } from '../service/record.service';
import container from '../utils/container';
import { HttpError } from '../utils/util';

export function attachRecord(paramLocation = 'path') {
  return async (req: RequestWithData<RecordDto>, res: Response, next: NextFunction) => {
    const recordService = container.get(RecordService);
    try {
      const recordId = getRecordId(req, paramLocation);
      const record = await recordService.findById(recordId);
      if (!record) {
        next(new HttpError('Record not found', 404));
      }
      if (req.user.id !== record.userId) {
        next(new HttpError('Permission denied', 403));
      }
      req.data = record;
      next();
    } catch (error) {
      next(error);
    }
  };
}

function getRecordId(req: RequestWithUser, paramLocation: string): string {
  switch (paramLocation) {
    case 'query':
      return req.query.recordId as string;
    case 'path':
      return req.params.id;
    default:
      return req.params.id;
  }
}