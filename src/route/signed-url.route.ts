import { Response, Router } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecordGroup } from '../middleware/record-roup.middleware';
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
    attachRecordGroup('query'),
    wrapAsync(async (req: RequestWithData<RecordGroup>, res: Response) => {
      const userId = req.user.id;
      const recordGroupId = req.data.id;
      const filename = cloudStorageService.generateFilename();
      const url = await cloudStorageService.getUploadUrl(userId, recordGroupId, filename);
      res.status(200).json({ url, filename });
    })
  );

  router.get('/download',
    tokenParser(),
    attachRecord('query'),
    wrapAsync(async (req: RequestWithData<Record>, res: Response) => {
      const userId = req.user.id;
      const { recordGroupId, filename } = req.data;
      const url = await cloudStorageService.getDownloadUrl(userId, recordGroupId, filename);
      res.status(200).json({ url });
    })
  );
}