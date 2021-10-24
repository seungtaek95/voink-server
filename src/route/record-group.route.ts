import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecordGroup } from '../middleware/record-group.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { PostRecordGroupDto } from '../model/record-group/dto/post-record-group.dto';
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
    validateBody(PostRecordGroupDto),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroup = await recordGroupService.saveOne(req.user.id, req.body);
      res.status(201).json({ id: recordGroup.id });
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
}