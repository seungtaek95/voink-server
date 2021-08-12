import { Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import { CloudStorageService } from '../service/cloud-storage.service';
import container from '../utils/container';

export default function (app: Router) {
  const router = Router();
  const cloudStorageService = container.get(CloudStorageService);

  app.use('/signed-url', router);

  router.get('/upload',
    tokenParser(),
    async (req: RequestWithUser, res: Response) => {
      try {
        const userId = req.user.id;
        const groupId = req.query.groupId as string;
        const result = await cloudStorageService.getUploadUrl(userId, groupId);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );

  router.get('/download',
    tokenParser(),
    attachRecord(),
    async (req: RequestWithData<Record>, res: Response) => {
      try {
        const userId = req.user.id;
        const { recordGroupId, filename } = req.data;
        const result = await cloudStorageService.getDownloadUrl(userId, recordGroupId, filename);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );
}