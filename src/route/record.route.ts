import { Readable } from 'stream';
import { Request, Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { headerTokenParser, queryTokenParser } from '../middleware/auth.middleware';
import container from '../utils/container';
import { CloudStorageService } from '../service/cloud-storage.service';
import { HttpError, wrapAsync } from '../utils/util';
import { RecordService } from '../service/record.service';

export default function (app: Router) {
  const router = Router();
  const recordService = container.get(RecordService);
  const cloudStorageService = container.get(CloudStorageService);

  app.use('/records', router);

  /**
   * thumbnail 파일 제공
   */
  router.get(/.*\.jpg/,
    queryTokenParser(),
    wrapAsync(async (req: Request, res: Response) => {
      const thumbnailPath = req.path.slice(1);
      const size = await cloudStorageService.getFileSize(thumbnailPath);
      const thumbnailStream = cloudStorageService.getFileStream(thumbnailPath);
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'image/jpg'
      });

      thumbnailStream
        .on('error', () => res.end())
        .pipe(res)
        .on('close', () => thumbnailStream.destroy());
    })
  );

  /**
   * record 파일 제공
   */
  router.get(/.*\.m4a/,
    queryTokenParser(),
    wrapAsync(async (req: Request, res: Response) => {
      const recordPath = req.path.slice(1);
      const range = req.headers.range;
      const size = await cloudStorageService.getFileSize(recordPath);
      let recordStream: Readable;
      
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : size - 1;

        recordStream = cloudStorageService.getFileStream(recordPath, { start, end }); 
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': 'audio/m4a'
        });
      } else {
        recordStream = cloudStorageService.getFileStream(recordPath); 
        res.writeHead(206, {
          'Accept-Ranges': 'bytes',
          'Content-Length': size,
          'Content-Type': 'audio/m4a'
        });
      }
      
      recordStream
        .on('error', () => res.end())
        .pipe(res)
        .on('close', () => recordStream.destroy());
    })
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
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordId = Number(req.params.id);
      const record = await recordService.findById(recordId);
      if (!record || record.userId !== req.user.id) {
        throw new HttpError('Not found', 404);
      }
      res.status(200).json(record);
    })
  );
}