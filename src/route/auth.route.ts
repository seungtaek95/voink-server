import { Response, Router } from 'express';
import { OAuthRequest } from '../interface/request.interface';
import { AuthService } from '../service/auth.service';
import container from '../utils/container';

export default function (app: Router) {
  const authRouter = Router();
  const authService = container.get(AuthService);

  app.use('/auth', authRouter);

  authRouter.post('/login/facebook',
    async (req: OAuthRequest, res: Response) => {
      try {
        const user = await authService.handleFacebookLogin(req.body.accessToken);
        const jwt = await authService.createJwt({ id: user.id, email: user.email });
        res.cookie('accessToken', jwt, {
          httpOnly: true,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  );
}