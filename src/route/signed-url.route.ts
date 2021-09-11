import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecordGroup } from '../middleware/record-group.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { RecordGroup } from '../model/record-group/record-group.entity';
import { Record } from '../model/record/record.entity';
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
      const result = await cloudStorageService.getUploadUrl(req.user.id);
      res.status(200).json(result);
    })
  );

  router.get('/download',
    tokenParser(),
    attachRecord('query'),
    wrapAsync(async (req: RequestWithData<Record>, res: Response) => {
      const url = await cloudStorageService.getDownloadUrl(req.data.filepath);
      res.status(200).json({ url });
    })
  );
}