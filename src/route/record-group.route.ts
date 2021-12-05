import { plainToClass } from 'class-transformer';
import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { headerTokenParser } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { CreateRecordGroupDto } from '../model/record-group/dto/create-record-group.dto';
import { PostRecordGroupDto } from '../model/record-group/dto/post-record-group.dto';
import { RecordGroupService } from '../service/record-group.service';
import container from '../utils/container';
import { HttpError, wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const recordGroupService = container.get(RecordGroupService);

  app.use('/record-groups', router);

  router.post('/',
    headerTokenParser(),
    validateBody(PostRecordGroupDto),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const createRecordGroupDto = plainToClass(CreateRecordGroupDto, req.body);
      createRecordGroupDto.userId = req.user.id;
      const recordGroup = await recordGroupService.saveOne(createRecordGroupDto);
      res.status(201).json({ id: recordGroup.id });
    })
  );

  router.get('/',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroups = await recordGroupService.findByUserId(req.user.id);
      res.status(200).json(recordGroupService.toDto(recordGroups));
    } )
  );

  router.get('/:id',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroupId = Number(req.params.id);
      const recordGroup = await recordGroupService.findById(recordGroupId);
      if (!recordGroup || recordGroup.userId !== req.user.id) {
        throw new HttpError('Not found', 404);
      }
      res.status(200).json(recordGroupService.toDto(recordGroup));
    })
  );

  router.delete('/:id',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGorupId = Number(req.params.id);
      await recordGroupService.setToDeleted(recordGorupId);
      res.status(200).json({ message: 'Record group deleted' });
    })
  );
}