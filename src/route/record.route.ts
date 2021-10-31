import { Readable } from 'stream';
import { Request, Response, Router } from 'express';
import { RequestWithData, RequestWithUser } from '../interface/request.interface';
import { headerTokenParser, queryTokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import container from '../utils/container';
import { CloudStorageService } from '../service/cloud-storage.service';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const cloudStorageService = container.get(CloudStorageService);

  app.use('/records', router);

  router.get(/.*\.m4a/,
    queryTokenParser(),
    async (req: Request, res: Response) => {
      const recordPath = req.path.slice(1);
      const range = req.headers.range;
      const size = await cloudStorageService.getRecordSize(recordPath);
      let recordStream: Readable;
      
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : size - 1;

        recordStream = cloudStorageService.getRecordStream(recordPath, { start, end }); 
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': 'video/mp4'
        });
      } else {
        recordStream = cloudStorageService.getRecordStream(recordPath); 
        res.writeHead(206, {
          'Accept-Ranges': 'bytes',
          'Content-Length': size,
          'Content-Type': 'video/mp4'
        });
      }
      
      recordStream.on('error', () => res.end())
        .pipe(res)
        .on('close', () => recordStream.destroy());
    }
  );

  router.get('/upload-url',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      if (!req.query.count) {
        res.status(400).json('Request query "count" is required');
      }
      const count = req.query.count as string;
      const recordUploadUrls = await cloudStorageService.getRecordUploadUrls(req.user.id, parseInt(count));
      res.status(200).json(recordUploadUrls);
    })
  );
  
  router.get('/:id',
    headerTokenParser(),
    attachRecord(),
    (req: RequestWithData<Record>, res: Response) => {
      res.status(200).json(req.data);
    }
  );
}