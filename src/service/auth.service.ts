import { inject, injectable } from 'inversify';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { TYPE } from '../constant/type';
import { UserService } from './user.service';
import { CreateUserDto } from '../interface/dto';

export interface IUserInfo {
  name: string;
  email: string;
}

export interface IUserToken {
  id: string;
  name: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(UserService) private userService: UserService,
    @inject(TYPE.jwtSecretKey) private jwtSecretKey: string
  ) {}

  async handleFacebookLogin(accessToken: string): Promise<IUserInfo> {
    const userInfo = await this.getFacebookUserInfo(accessToken);    
    if (!userInfo.name || !userInfo.email) {
      throw new Error('not enough user information');
    }
    const foundUser = await this.userService.findOneByEmail(userInfo.email);
    if (foundUser) {
      return foundUser;
    }
    return this.userService.createOne({ provider: 'FACEBOOK', ...userInfo });
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

  private async getFacebookUserInfo(accessToken: string): Promise<IUserInfo> {
    const url = `https://graph.facebook.com/me?fields=name,email&access_token=${accessToken}`;
    const response = await axios.get<IUserInfo>(url);
    return response.data;
  }
}