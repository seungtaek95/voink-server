import axios, { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';
import { Readable } from 'stream';
import { IUserInfo } from '../interface/user.interface';
import { TYPE } from '../loader/container';

interface IOAuth {
  getUserInfo(accessToken: string): Promise<IUserInfo>
  getUserImageStream(accessToken: string, size: number): any
}

@injectable()
export class FacebookOAuth implements IOAuth {
  constructor(
    @inject(TYPE.fbRequest) private fbRequest: AxiosInstance,
  ) {}

  async getUserInfo(accessToken: string): Promise<IUserInfo> {
    const query = `?fields=name,email&access_token=${accessToken}`;
    const response = await this.fbRequest.get(query);
    return response.data;
  }

  async getUserImageStream(accessToken: string, size: number): Promise<Readable> {
    const query = `?fields=picture.height(${size})&access_token=${accessToken}`;
    try {
      const oauthRes = await this.fbRequest.get(query);
      const imageUrl = oauthRes.data.picture?.data?.url;
      const imageRes = await axios.get(imageUrl, {
        responseType: 'stream',
      });
      return imageRes.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(`error from server: ${error.response.data}`);
      }
      throw error;
    }
  }
}