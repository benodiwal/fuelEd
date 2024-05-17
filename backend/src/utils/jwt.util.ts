import getEnvVar from 'env/index';
import { sign, verify } from 'jsonwebtoken';
import { CustomJwtPayload } from 'types/jwt.types';

class Jwt {
  static sign(payload: string): string {
    return sign({ key: payload }, getEnvVar('JWT_SIGNING_KEY'), {
      expiresIn: getEnvVar('JWT_EXPIRY'),
    });
  }

  static verify(token: string): CustomJwtPayload {
    return verify(token, getEnvVar('JWT_SIGNING_KEY')) as CustomJwtPayload;
  }
}
