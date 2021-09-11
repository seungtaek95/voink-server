import { Response, Router } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { attachRecord } from '../middleware/record.middleware';
import { UserService } from '../service/user.service';
import container from '../utils/container';
import { wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const userService = container.get(UserService);

  app.use('/users', router);

  router.get('/me',
    tokenParser(),
    attachRecord(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const user = await userService.findById(req.user.id);
      res.status(200).json(user);
    })
  );
}