import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import { RecordService } from '../service/record.service';
import container from '../utils/container';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const recordService = container.get(RecordService);

  app.use('/records', router);

  router.post('/',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const result = await recordService.saveOne(req.user.id, req.body);
      res.status(201).json(result);
    })
  );

  router.get('/:id',
    tokenParser(),
    attachRecord(),
    (req: RequestWithData<Record>, res: Response) => {
      res.status(200).json(req.data);
    }
  );

  router.delete('/:id', 
    tokenParser(),
    attachRecord(),
    wrapAsync(async (req: RequestWithData<Record>, res: Response) => {
      await recordService.deleteOne(req.data);
      res.status(200).json({ message: 'record deleted' });
    })
  );
}