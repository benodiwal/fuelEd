import { validateRequestBody } from "validators/validateRequest";
import AbstractController from "./index.controller";
import { NextFunction, Request, Response } from "express";
import { createEventSchema } from "zod/schema";
import { InternalServerError } from "errors/internal-server-error";

class EventsController extends AbstractController {

  createEvent() {
    return [
      validateRequestBody(createEventSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          const { name, startDate, endDate } = req.body as unknown as { name: string, startDate: string, endDate: string };
          const host = await this.ctx.hosts.createHostByUserId(userId);
          
          if (!host) {
            return res.sendStatus(404);
          }
          
          await this.ctx.events.create({
            data: {
              name,
              startDate,
              endDate,
              hostId: host.id,
            }
          });
          
          res.status(201);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());  
        }
      }
    ];
  }

  getEventById() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const event = await this.ctx.events.findUnqiue({
            where: {
              id,
            },
          });

          return res.status(200).send(event);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      }
    ];
  }

}

export default EventsController;
