import { NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { RequestWithUser } from '../interface/request.interface';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import container from '../utils/container';
import { HttpError } from '../utils/util';

export function tokenParser() {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = container.get(AuthService);
    const userService = container.get(UserService);

    if (!req.headers.authorization) {
      return next(new HttpError('No token found', 401));
    }
    
    const token = req.headers.authorization.split(' ')[1];
    try {
      const verifiedUser = await authService.verifyJwt(token);
      const user = await userService.findOneByEmail(verifiedUser.email);   

      if (!user) {
        return next(new HttpError('Unauthorized', 401));
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return next(new HttpError(error.message, 401));
      }
      next(error);
    }
  };
}