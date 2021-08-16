import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { User } from '../model/user/user.entity';
import { FacebookOAuth } from '../utils/oauth';
import { IUserInfo } from '../interface/user.interface';
import { TYPE } from '../loader/container';

export interface ITokenPayload {
  id: number;
  email: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(FacebookOAuth) private facebookOAuth: FacebookOAuth,
    @inject(UserService) private userService: UserService,
    @inject(TYPE.jwtSecretKey) private jwtSecretKey: string,
  ) {}

  async handleFacebookLogin(accessToken: string): Promise<User> {
    const userInfo: IUserInfo = await this.facebookOAuth.getUserInfo(accessToken);
    const foundUser: User = await this.userService.findOneByEmail(userInfo.email);
    if (foundUser) {
      return foundUser;
    }
    return this.userService.saveOne('FACEBOOK', userInfo);
  }

  createJwt(payload: ITokenPayload): Promise<string> {    
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.jwtSecretKey, (error: Error, token: string) => {        
        if (error) return reject(error);
        resolve(token);
      });
    });
  }

  verifyJwt(token: string): Promise<ITokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecretKey, (error: Error, decoded: ITokenPayload) => {
        if (error) return reject(error);
        resolve({
          id: decoded.id,
          email: decoded.email,
        });
      });
    });
  }
}