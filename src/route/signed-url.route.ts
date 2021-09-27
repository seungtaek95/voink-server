import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { CloudStorageService } from '../service/cloud-storage.service';
import container from '../utils/container';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const cloudStorageService = container.get(CloudStorageService);

  app.use('/signed-url', router);

  router.get('/upload',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordUploadUrls = await cloudStorageService.getRecordUploadUrls(req.user.id);
      res.status(200).json(recordUploadUrls);
    })
  );
}