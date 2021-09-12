import { Response, Router } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';

export default function (app: Router) {
  const router = Router();

  app.use('/records', router);

  router.get('/:id',
    tokenParser(),
    attachRecord(),
    (req: RequestWithData<Record>, res: Response) => {
      res.status(200).json(req.data);
    }
  );
}