import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interface/request.interface';
import { AuthService } from '../service/auth.service';
import container from '../utils/container';

export function tokenParser() {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authService = container.get(AuthService);
    const token = req.headers.authorization.split(' ')[1];    
    try {
      const verifiedUser = await authService.verifyJwt(token);
      req.user = verifiedUser;      
      next();
    } catch (error) {
      next(error);
    }
  };
}