import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
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
}