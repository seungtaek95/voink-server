import { Request } from 'express';
import { IUserToken } from '../service/auth.service';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}

export interface RequestWithUser extends Request {
  user: IUserToken;
}