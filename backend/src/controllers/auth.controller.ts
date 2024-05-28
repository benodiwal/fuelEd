import AbstractController from './index.controller';
import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'errors/internal-server-error';
import { validateRequestBody } from 'validators/validateRequest';
import { z } from 'zod';
import axios from 'axios';

class AuthController extends AbstractController {
  getAuthGoogleCallback() {
    return [
      validateRequestBody(z.object({ token: z.string().min(10) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { token } = req.body as unknown as { token: string };

          const { data: payload } = await axios.get('https://people.googleapis.com/v1/people/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              personFields: 'emailAddresses,names,photos',
            },
          });

          const email = payload.emailAddresses[0].value;
          const name = payload.names[0].displayName;

          let user = await this.ctx.users.findFirst({
            where: {
              email,
              name,
            },
          });

          if (user) {
            req.session.currentUserId = user.id;
            return res.status(200).json({
              message: 'Ok',
              data: user,
            });
          }

          user = await this.ctx.users.create({
            data: {
              name,
              email,
            },
          });

          req.session.currentUserId = user.id;
          return res.status(201).json({
            message: 'Ok',
            data: user,
          });
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default AuthController;
