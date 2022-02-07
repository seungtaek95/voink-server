import { NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from '../../auth/auth.service';
import { RequestWithUser } from '../interface/request.interface';
import container from '../utils/container';
import { HttpError } from '../utils/util';

export function headerTokenParser() {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = container.get(AuthService);

    if (!req.headers.authorization) {
      return next(new HttpError('No token found', 401));
    }
    
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await authService.verifyJwt(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return next(new HttpError(error.message, 401));
      }
      next(error);
    }
  };
}

export function queryTokenParser() {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = container.get(AuthService);

    if (!req.query.accessToken) {
      return next(new HttpError('No token found', 401));
    }
    
    const token = <string>req.query.accessToken;
    try {
      const decodedToken = await authService.verifyJwt(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return next(new HttpError(error.message, 401));
      }
      next(error);
    }
  };
}