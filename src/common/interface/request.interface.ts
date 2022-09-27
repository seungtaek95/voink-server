import { Request } from 'express';
import { UserToken } from '../../auth/auth.service';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}

export interface RequestWithUser extends Request {
  user: UserToken;
}

export interface RequestWithBody<T> extends RequestWithUser {
  body: T;
}