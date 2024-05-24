import googleOAuthClient from 'libs/google.lib';
import AbstractController from './index.controller';
import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'errors/internal-server-error';
import { validateReuestQuery } from 'validators/validateRequest';
import { z } from 'zod';

class AuthController extends AbstractController {
  getAuthGoogle() {
    return [
      (_: Request, res: Response) => {
        return res.json({ url: googleOAuthClient.generateAuthUrl() });
      },
    ];
  }

  getAuthGoogleCallback() {
    return [
      validateReuestQuery(z.object({ code: z.string().min(10) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { code } = req.query as unknown as { code: string };
          const payload = await googleOAuthClient.getTokenAndVerifyFromCode(code);
          let user = await this.ctx.users.findFirst({
            where: {
              sub: payload.sub,
            },
          });
          if (user) {
            req.session.currentUserId = user.id;
            return res.status(200);
          }
          user = await this.ctx.users.create({
            data: {
              email: payload.email as string,
              name: payload.name as string,
              sub: payload.sub,
            },
          });
          req.session.currentUserId = user.id;
          return res.status(201);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default AuthController;
