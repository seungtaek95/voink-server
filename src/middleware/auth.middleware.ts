import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import container from '../utils/container';

export function tokenParser() {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = container.get(AuthService);
    const userService = container.get(UserService);

    if (!req.headers.authorization) {
      return next(new Error('No token found'));
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const verifiedUser = await authService.verifyJwt(token);
      const user = await userService.findOneByEmail(verifiedUser.email);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}