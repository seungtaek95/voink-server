import { NextFunction, Response } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupService } from '../service/record-group.service';
import container from '../utils/container';

export function attachRecordGroup(paramLocation = 'path') {
  return async (req: RequestWithData<RecordGroup>, res: Response, next: NextFunction) => {
    const recordGroupService = container.get(RecordGroupService);
    try {
      const recordGroupId = getRecordGroupId(req, paramLocation);
      const recordGroup = await recordGroupService.findById(recordGroupId);
      req.data = recordGroup;
      next();
    } catch (error) {
      next(error);
    }
  };
}

function getRecordGroupId(req: RequestWithUser, paramLocation: string): string {
  switch (paramLocation) {
    case 'query':
      return req.query.recordGroupId as string;
    case 'path':
      return req.params.id;
    default:
      return req.params.id;
  }
}