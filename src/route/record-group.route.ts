import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
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
      const recordGroups = await recordGroupService.findByUser(req.user.id);
      res.status(200).json(recordGroups);
    } )
  );

  router.get('/:id',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroup = await recordGroupService.findById(req.params.id);
      res.status(200).json(recordGroup);
    })
  );
}