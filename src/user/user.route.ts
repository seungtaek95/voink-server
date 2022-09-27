import { Response, Router } from 'express';
import { UserService } from './user.service';
import container from '../common/utils/container';
import { wrapAsync } from '../common/utils/util';
import { RequestWithUser } from '../common/interface/request.interface';
import { headerTokenParser } from '../common/middleware/auth.middleware';

export default function (app: Router) {
  const router = Router();
  const userService = container.get(UserService);

  app.use('/users', router);

  router.get('/me',
    headerTokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const user = await userService.findById(req.user.id);
      res.status(200).json(user);
    })
  );
}