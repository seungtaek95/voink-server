import { Response, Router } from 'express';
import { OAuthRequest, RequestWithUser } from '../common/interface/request.interface';
import { headerTokenParser } from '../common/middleware/auth.middleware';
import { validateBody } from '../common/middleware/validate.middleware';
import { PostAuthLoginDto } from './model/post-auth-login.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import container from '../common/utils/container';
import { HttpError, wrapAsync } from '../common/utils/util';

export default function (app: Router) {
  const router = Router();
  const authService = container.get(AuthService);
  const userService = container.get(UserService);

  app.use('/auth', router);

  router.get('/',
    headerTokenParser(),
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
    validateBody(PostAuthLoginDto),
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