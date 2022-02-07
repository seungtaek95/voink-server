import { Request } from 'express';
import { User } from '../model/user/user.entity';
import { UserToken } from '../service/auth.service';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}

export interface RequestWithUser extends Request {
  user: UserToken;
}

export interface RequestWithData<T> extends RequestWithUser {
  data: T
}