import { Response, Router } from 'express';
import { OAuthRequest, RequestWithUser } from '../interface/request.interface';
import { tokenParser } from '../middleware/auth.middleware';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import container from '../utils/container';
import { HttpError, wrapAsync } from '../utils/util';

export default function (app: Router) {
  const router = Router();
  const authService = container.get(AuthService);
  const userService = container.get(UserService);

  app.use('/auth', router);

  router.get('/',
    tokenParser(),
    wrapAsync(async (req: RequestWithUser, res: Response) => {
      const user = await userService.findById(req.user.id);
      if (!user) {
        throw new HttpError('Invalid token', 401);
      }

      const now = Math.round(Date.now() / 1000);
      res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        expiresIn: req.user.exp - now,
      });
    }
  ));

  router.post('/login/facebook',
    wrapAsync(async (req: OAuthRequest, res: Response) => {
      const user = await authService.handleFacebookLogin(req.body.accessToken);
      const jwt = await authService.createJwt({ id: user.id, email: user.email });
      
      res.status(200).json({
        accessToken: jwt,
        userInfo: user,
      });
    })
  );
}