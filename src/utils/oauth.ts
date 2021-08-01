import { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import { TYPE } from '../constant/type';
import { IUserInfo } from '../interface/user.interface';

interface IOAuth {
  getUserInfo(accessToken: string): Promise<IUserInfo>
  getUserProfile(accessToken: string, size: number): any
}

@injectable()
export class FacebookOAuth implements IOAuth {
  private url: string

  constructor(
    @inject(TYPE.fbRequest) private fbRequest: AxiosInstance,
  ) {}

  async getUserInfo(accessToken: string): Promise<IUserInfo> {
    const query = `?fields=name,email&access_token=${accessToken}`;
    const response = await this.fbRequest.get(query);
    return response.data;
  }

  async getUserProfile(accessToken: string, size: number) {
    const query = `?fields=profile.height(${size})&access_token=${accessToken}`;
    const response = await this.fbRequest.get(query, {
      responseType: 'stream',
    });
    return response;
  }
}