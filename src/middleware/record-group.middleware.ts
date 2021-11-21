import { NextFunction, Response } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { RecordGroupDto } from '../model/record-group/dto/record-group.dto';
import { RecordGroupService } from '../service/record-group.service';
import container from '../utils/container';
import { HttpError } from '../utils/util';

export function attachRecordGroup(paramLocation = 'path') {
  return async (req: RequestWithData<RecordGroupDto>, res: Response, next: NextFunction) => {
    const recordGroupService = container.get(RecordGroupService);
    try {
      const recordGroupId = getRecordGroupId(req, paramLocation);
      const recordGroup = await recordGroupService.findById(recordGroupId);
      if (!recordGroup) {
        next(new HttpError('Record not found', 404));
      }
      
      if (req.user.id !== recordGroup.userId) {
        next(new HttpError('Permission denied', 403));
      }
      req.data = recordGroup;
      next();
    } catch (error) {
      next(error);
    }
  };
}

function getRecordGroupId(req: RequestWithUser, paramLocation: string) {
  switch (paramLocation) {
    case 'query':
      return Number(req.query.recordGroupId);
    case 'path':
      return Number(req.params.id);
    default:
      return Number(req.params.id);
  }
}