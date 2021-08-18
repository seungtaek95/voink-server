import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecordGroup } from '../middleware/record-roup.middleware';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { RecordGroupService } from '../service/record-group.service';
import container from '../utils/container';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const recordGroupService = container.get(RecordGroupService);

  app.use('/record-groups', router);

  router.post('/',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroup = await recordGroupService.saveOne(req.body);
      res.status(201).json(recordGroup);
    })
  );

  router.get('/',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroups = await recordGroupService.findByUserId(req.user.id);
      res.status(200).json(recordGroups);
    } )
  );

  router.get('/:id',
    tokenParser(),
    attachRecordGroup(),
    wrapAsync(async (req: RequestWithData<RecordGroup>, res: Response) => {
      res.status(200).json(req.data);
    })
  );

  router.delete('/:id',
    tokenParser(),
    attachRecordGroup(),
    wrapAsync(async (req: RequestWithData<RecordGroup>, res: Response) => {
      await recordGroupService.deleteOne(req.user.id, req.data);
      res.status(200).json({ message: 'record group deleted' });
    })
  );
}