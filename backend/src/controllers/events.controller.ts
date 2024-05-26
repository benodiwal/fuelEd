import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import AbstractController from './index.controller';
import { NextFunction, Request, Response } from 'express';
import { createEventSchema, createPollSchema, createPostSchema } from 'zod/schema';
import { InternalServerError } from 'errors/internal-server-error';
import emailService from 'libs/email.lib';
import { z } from 'zod';
import { Role } from 'interfaces/libs';
import { InviteStatus } from '@prisma/client';

class EventsController extends AbstractController {
  getAllEventsByUserId() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;

          // const guest = await this.ctx.guests.findMany({
          //   where: {
          //     userId,
          //   },
          // });

          const hostedEvents = await this.ctx.events.findMany({
            where: {
              host: {
                userId: userId,
              },
            },
          });

          // const guestEvents = await this.ctx.events.findMany({
          //   where: {
          //     guests: {
          //       some: {
          //         guestId: guest?.id,
          //       },
          //     },
          //   },
          // });

          const allEvents = [...hostedEvents];

          res.status(200).send({ data: allEvents });
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createEvent() {
    return [
      validateRequestBody(createEventSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;

          const { title, description, startDate, endDate, startTime } = req.body as unknown as {
            title: string;
            startDate: string;
            endDate: string;
            description: string;
            startTime: string;
          };

          const host = await this.ctx.hosts.createHostByUserId(userId);

          if (!host) {
            return res.sendStatus(404);
          }

          const event = await this.ctx.events.create({
            data: {
              title,
              description,
              startDate,
              endDate,
              startTime,
              host: {
                connect: {
                  id: host.id,
                },
              },
            },
          });

          res.status(201).json({
            data: event,
          });
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
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
            include: {
              host: true,
              guests: true,
              vendors: true,
              rsvps: true,
              eventPosts: true,
              eventPolls: {
                include: {
                  options: true,
                },
              },

              eventHostMessage: true,
            },
          });

          return res.status(200).send({ data: event });
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  sendInvite() {
    return [
      validateRequestParams(z.object({ id: z.string(), role: z.enum(['guest', 'vendor']) })),
      validateRequestBody(z.object({ name: z.string(), email: z.string().email() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, email } = req.body as unknown as { name: string; email: string };
          const { id: eventId, role } = req.params as unknown as { id: string; role: Role };

          const invite = await this.ctx.invites.create({
            data: {
              email,
              event: {
                connect: {
                  id: eventId,
                },
              },
            },
          });

          await emailService.sendEmail({
            name,
            email,
            inviteId: invite.id,
            data: {
              role: role,
            },
            eventId,
          });

          res.sendStatus(200);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  acceptInvite() {
    return [
      validateRequestParams(z.object({ id: z.string(), inviteId: z.string(), role: z.enum(['guest', 'vendor']) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id: eventId, inviteId, role } = req.params as unknown as { id: string; inviteId: string; role: Role };
          const userId = req.session.currentUserId as string;

          if (role == 'guest') {
            const guest = await this.ctx.guests.createGuestByUserId(userId);

            await this.ctx.db.client.eventGuest.create({
              data: {
                guest: {
                  connect: {
                    id: guest?.id,
                  },
                },
                event: {
                  connect: {
                    id: eventId,
                  },
                },
              },
            });
          } else {
            let vendor = await this.ctx.vendors.createVendorByUserId(userId);

            await this.ctx.db.client.eventVendor.create({
              data: {
                vendor: {
                  connect: {
                    id: vendor?.id,
                  },
                },
                event: {
                  connect: {
                    id: eventId,
                  },
                },
              },
            });
          }

          await this.ctx.invites.update({
            where: {
              id: inviteId,
            },
            data: {
              status: InviteStatus.CONFIRMED,
            },
          });

          res.sendStatus(200);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createPost() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(createPostSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const { heading, description, sendEmail } = req.body as unknown as { heading: string; description: string; sendEmail: boolean };

          const post = await this.ctx.eventPosts.create({
            data: {
              heading,
              description,
              sendEmail,
              event: {
                connect: { id },
              },
            },
          });

          res.status(200).send({ data: post });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getPostById() {
    return [
      validateRequestParams(z.object({ id: z.string(), postId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { postId } = req.params as unknown as { postId: string };
          const eventPost = await this.ctx.eventPosts.findUnqiue({
            where: {
              id: postId,
            },
          });
          console.log(eventPost);
          res.sendStatus(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createPoll() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(createPollSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params as unknown as { id: string };
          const { heading, description, sendEmail, allowMultiple, options } = req.body as unknown as {
            heading: string;
            description: string;
            sendEmail: boolean;
            allowMultiple: boolean;
            options: string[];
          };

          const eventPoll = await this.ctx.eventPolls.create({
            data: {
              heading,
              description,
              sendEmail,
              allowMultiple,
              event: {
                connect: { id },
              },
            },
          });

          for (const option of options) {
            await this.ctx.eventPollOptions.createByPollId(eventPoll.id, option);
          }

          res.sendStatus(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getPollById() {
    return [
      validateRequestParams(z.object({ id: z.string(), pollId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { pollId } = req.params as unknown as { pollId: string };
          const eventPoll = await this.ctx.eventPolls.findUnqiue({
            where: {
              id: pollId,
            },
            include: {
              options: true,
            },
          });
          console.log(eventPoll);
          res.sendStatus(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updatePollById() {
    return [
      validateRequestParams(z.object({ id: z.string(), pollId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {

        try {
         const { pollId } = req.params as unknown as { pollId: string };

        const eventPoll = await this.ctx.eventPollOptions.findFirst({
          where: {
            eventPollId: pollId,
          }
        });

        if (!eventPoll) {
          return res.sendStatus(404);
        }

        await this.ctx.eventPollOptions.update({
          where: {
            id: eventPoll.id
          },
          data: {
            count: eventPoll.count + 1,
          }
        });

        res.sendStatus(201);         
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }

      }
    ];
  }

  createVenuePlan() {
    return [
      validateRequestBody(z.object({ title: z.string(), json: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          console.log(userId);

          const eventId = req.params['id'];
          console.log(eventId);

          const { title, json } = req.body as unknown as { title: string; json: string };

          await this.ctx.eventFloorPlans.create({
            data: {
              title,
              floorPlanJson: json,
              event: {
                connect: {
                  id: eventId,
                },
              },
            },
          });

          res.status(200).send({ data: eventId });
        } catch (error) {
          console.error(error);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default EventsController;
