import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
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
        const groupId = req.query.groupId as unknown;
        const filename = req.query.filename as unknown;
        const result = await cloudStorageService.getUploadUrl(userId, groupId as number, filename as string);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );
}