import { Request, Response, Router } from 'express';
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
    (req: RequestWithUser, res: Response) => {
      
    }
  )
}