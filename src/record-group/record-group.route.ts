import { Response, Router } from 'express';
import { RequestWithBody, RequestWithUser } from '../common/interface/request.interface';
import { headerTokenParser } from '../common/middleware/auth.middleware';
import { validateBody } from '../common/middleware/validate.middleware';
import { PostRecordGroupDto } from './model/dto/post-record-group.dto';
import { RecordGroupService } from './record-group.service';
import container from '../common/utils/container';
import { wrapAsync } from '../common/utils/util';

export default function (app: Router) {
  const router = Router();
  const recordGroupService = container.get(RecordGroupService);

  app.use('/record-groups', router);

  router.post('/',
    headerTokenParser(),
    validateBody(PostRecordGroupDto),
    wrapAsync(async (req: RequestWithBody<PostRecordGroupDto>, res: Response) => {
      const postRecordGroupDto = req.body;
      const id = await recordGroupService.save(postRecordGroupDto.toCreateRecordGroupDto(req.user.id));
      res.status(201).json({ id });
    })
  );

  router.get('/',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroupDtos = await recordGroupService.findByUserId(req.user.id);
      res.status(200).json(recordGroupDtos);
    } )
  );

  router.get('/:id',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const recordGroupId = Number(req.params.id);
      const recordGroupDto = await recordGroupService.findById(recordGroupId, req.user.id);
      res.status(200).json(recordGroupDto);
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