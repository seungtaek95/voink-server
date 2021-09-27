import { Readable } from 'stream';
import { Request, Response, Router } from 'express';
import { RequestWithData } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { Record } from '../model/record/record.entity';
import { RecordService } from '../service/record.service';
import container from '../utils/container';

export default function (app: Router) {
  const router = Router();
  const recordService = container.get(RecordService);

  app.use('/records', router);

  router.get(/.*\.m4a/,
    // tokenParser(),
    async (req: Request, res: Response) => {
      const recordPath = req.url.slice(1);
      const range = req.headers.range;
      const size = await recordService.getRecordSize(recordPath);
      let recordStream: Readable;
      
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : size - 1;

        recordStream = recordService.getRecordStream(recordPath, { start, end }); 
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': 'video/mp4'
        });
      } else {
        recordStream = recordService.getRecordStream(recordPath); 
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
  
  router.get('/:id',
    tokenParser(),
    attachRecord(),
    (req: RequestWithData<Record>, res: Response) => {
      res.status(200).json(req.data);
    }
  );
}