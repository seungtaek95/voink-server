import { Request } from 'express';

export interface OAuthRequest extends Request {
  body: {
    accessToken: string;
  };
}