import { Request } from 'express';
import { ITokenPayload } from '../service/auth.service';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}

export interface RequestWithUser extends Request {
  user: ITokenPayload;
}

export interface RequestWithData<T> extends RequestWithUser {
  data: T
}