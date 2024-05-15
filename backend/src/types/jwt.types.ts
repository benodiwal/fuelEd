import { JwtPayload } from 'jsonwebtoken';

export type CustomJwtPayload = JwtPayload & {
  key: string;
};
