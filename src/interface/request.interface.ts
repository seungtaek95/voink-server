import { Request } from 'express';
import { User } from '../model/user/user.entity';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestWithData<T> extends RequestWithUser {
  data: T
}