import { InternalServerError } from 'errors/internal-server-error';
import AbstractController from './index.controller';
import { Request, Response, NextFunction } from 'express';
import googleCalender from 'libs/calender.lib';
import { validateRequestBody, validateRequestQuery } from 'validators/validateRequest';
import { z } from 'zod';
import { addEventSchema } from 'zod/schema';

class CalenderController extends AbstractController {
  generateAuthUrl() {
    return [
      async (_: Request, res: Response, next: NextFunction) => {
        try {
          const authUrl = googleCalender.generateAuthUrl();
          res.redirect(authUrl);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getToken() {
    return [
      validateRequestQuery(z.object({ code: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { code } = req.query as { code: string };
          await googleCalender.getToken(code);
          res.redirect('http://localhost:3000/events');
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  addEvent() {
    return [
      validateRequestBody(addEventSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { summary, description, start, end } = req.body as {
            summary: string;
            description: string;
            start: string;
            end: string;
          };

          await googleCalender.addEvent(summary, description, start, end);

          res.send({ msg: 'Event added successfully' });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default CalenderController;
