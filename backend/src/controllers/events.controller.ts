import { validateRequestBody, validateRequestParams } from "validators/validateRequest";
import AbstractController from "./index.controller";
import { NextFunction, Request, Response } from "express";
import { createEventSchema } from "zod/schema";
import { InternalServerError } from "errors/internal-server-error";
import emailService from "libs/email.lib";
import { z } from "zod";
import { Role } from "interfaces/libs";
import { InviteStatus } from "@prisma/client";

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
              host: {
                connect: {
                  id: host.id,
                }
              }
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

  sendInvite() {
    return [
      validateRequestParams(z.object({ id: z.string(), role: z.enum(["guest", "vendor"]) })),
      validateRequestBody(z.object({ email: z.string().email() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email } = req.body as unknown as { email: string };
          const { id: eventId, role } = req.params as unknown as { id: string, role: Role };
          
          const invite = await this.ctx.invites.create({
            data: {
              email,
              event: {
                connect: {
                  id: eventId,
                }
              }
            }
          });

          await emailService.sendEmail({
            email,
            inviteId: invite.id,
            data: {
              role: role,
            },
            eventId
          });

          res.sendStatus(200);          
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      }
    ];
  }
  
  acceptInvite() {
    return [
      validateRequestParams(z.object({ id: z.string(), inviteId: z.string(), role: z.enum(["guest", "vendor"]) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id: eventId, inviteId, role } = req.params as unknown as { id: string, inviteId: string, role: Role };
          const userId = req.session.currentUserId as string;

          if (role == 'guest') {
            let guest = await this.ctx.guests.createGuestByUserId(userId);
            guest = await this.ctx.guests.update({
              where: {
                id: guest?.id,
              },
              data: {
                events: {
                  connect: [{
                    id: eventId,
                  }]
                }
              }
            });
          } else {
            let vendor = await this.ctx.vendors.createVendorByUserId(userId);
            vendor = await this.ctx.guests.update({
              where: {
                id: vendor?.id,
              },
              data: {
                events: {
                  connect: [{
                    id: eventId,
                  }]
                }
              }
            });
          }

          await this.ctx.invites.update({
            where: {
              id: inviteId,
            },
            data: {
              status: InviteStatus.CONFIRMED,          
            }
          });

          res.sendStatus(200);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      }
    ];
  }

}

export default EventsController;
