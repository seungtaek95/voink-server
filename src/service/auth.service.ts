import { inject, injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';

@injectable()
export class AuthService {
  constructor(
    @inject('jwtSecretKey') private jwtSecretKey: string
  ) {}

  createJwt(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.jwtSecretKey, (error: Error, token: string) => {
        if (error) return reject(error);
        resolve(token);
      });
    });
  }

  verifyJwt(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecretKey, (error: Error, decoded) => {
        if (error) return reject(error);
        resolve(decoded);
      });
    });
  }
}