import axios from 'axios';
import { injectable } from 'inversify';
import { IUserInfo } from '../interface/user.interface';

interface IOAuth {
  getUserInfo(accessToken: string): Promise<IUserInfo>
  getUserProfile(accessToken: string): any
}

@injectable()
export class FacebookOAuth implements IOAuth {
  private url: string

  constructor() {
    this.url = 'https://graph.facebook.com/me';
  }

  async getUserInfo(accessToken: string): Promise<IUserInfo> {
    const query = `?fields=name,email&access_token=${accessToken}`;
    const response = await axios.get<IUserInfo>(`${this.url}${query}`);
    return response.data;
  }

  async getUserProfile(accessToken: string) {
    const query = `?fields=name,email&access_token=${accessToken}`;
    const response = await axios.get(`${this.url}${query}`, {
      responseType: 'stream',
    });
    return response;
  }
}