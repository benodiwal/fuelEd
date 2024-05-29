import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import { z } from 'zod';
import { InternalServerError } from 'errors/internal-server-error';

class GuestController extends AbstractController {
  updateGuest() {
    return [
      validateRequestParams(z.object({ eventId: z.string() })),
      validateRequestBody(z.object({ avatar: z.string(), nickName: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const eventId = req.eventId as string;
          const userId = req.session.currentUserId;
          const { avatar, nickName } = req.body;

          const guest = await this.ctx.guests.findFirst({
            where: {
              userId,
              events: {
                some: {
                  eventId,
                },
              },
            },
          });

          if (!guest) {
            throw new InternalServerError();
          }

          await this.ctx.guests.update({
            where: {
              id: guest.id,
            },
            data: {
              avatar,
              nickName,
            },
          });

          res.status(200).json({ data: 'guest' });
        } catch (e) {
          console.error(e);
          res.sendStatus(500);
          next(InternalServerError);
        }
      },
    ];
  }
}

export default GuestController;
