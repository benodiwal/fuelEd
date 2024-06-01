import { NextFunction, Request, Response } from 'express';
import AbstractController from './index.controller';
import { validateRequestBody } from 'validators/validateRequest';
import { z } from 'zod';
import { InternalServerError } from 'errors/internal-server-error';

class GuestController extends AbstractController {
  updateGuest() {
    return [
      validateRequestBody(z.object({ avatar: z.number(), nickName: z.string() })),
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

          const updatedGuest = await this.ctx.guests.update({
            where: {
              id: guest.id,
            },
            data: {
              avatar,
              nickName,
            },
          });

          res.status(200).json({ data: updatedGuest });
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
