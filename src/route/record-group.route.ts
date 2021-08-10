import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { RecordGroupService } from '../service/record-group.service';
import container from '../utils/container';

export default function (app: Router) {
  const router = Router();
  const recordGroupService = container.get(RecordGroupService);

  app.use('/record-groups', router);

  router.post('/',
    tokenParser(),
    async (req: RequestWithUser, res: Response) => {
      try {
        const recordGroup = await recordGroupService.saveOne(req.body);
        res.status(201).json(recordGroup);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );
}