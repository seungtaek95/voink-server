import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import { RecordService } from '../service/record.service';
import container from '../utils/container';

export default function (app: Router) {
  const router = Router();
  const recordService = container.get(RecordService);

  app.use('/records', router);

  router.post('/',
    tokenParser(),
    async (req: RequestWithUser, res: Response) => {
      try {
        const recordGroup = await recordService.saveOne(req.body);
        res.status(201).json(recordGroup);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );

  router.get('/:id',
    tokenParser(),
    attachRecord(),
    (req: RequestWithData<Record>, res: Response) => {
      res.status(200).json(req.data);
    }
  );
}