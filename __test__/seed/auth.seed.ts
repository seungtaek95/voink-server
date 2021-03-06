import * as jwt from 'jsonwebtoken';
import { serverConfig } from '../../src/common/config';

export function getTestUserToken(user: any) {
  return jwt.sign(user, serverConfig.jwtSecretKey, {
    expiresIn: serverConfig.jwtExpiresIn
  });
}
