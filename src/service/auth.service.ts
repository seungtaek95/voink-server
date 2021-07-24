import { inject, injectable } from 'inversify';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { IUserToken } from '../interfaces/user.interface';

@injectable()
export class AuthService {
  constructor(
    @inject('jwtSecretKey') private jwtSecretKey: string
  ) {}

  async getFacebookUserInfo(accessToken: string) {
    const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    const response = await axios.get(url);    
    return response.data;
  }

  createJwt(payload: IUserToken): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.jwtSecretKey, (error: Error, token: string) => {
        if (error) return reject(error);
        resolve(token);
      });
    });
  }

  verifyJwt(token: string): Promise<IUserToken> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecretKey, (error: Error, decoded: IUserToken) => {
        if (error) return reject(error);
        resolve(decoded);
      });
    });
  }
}