import { Response, Router } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import { CloudStorageService } from '../service/cloud-storage.service';
import container from '../utils/container';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const cloudStorageService = container.get(CloudStorageService);

  app.use('/signed-url', router);

  router.get('/download',
    tokenParser(),
    attachRecord('query'),
    wrapAsync(async (req: RequestWithData<Record>, res: Response) => {
      const url = await cloudStorageService.getDownloadUrl(req.data.filepath);
      res.status(200).json({ url });
    })
  );
}