import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import AbstractController from './index.controller';
import { NextFunction, Request, Response } from 'express';
import { createEventSchema, createPollSchema, createPostSchema, updatePollOptionSchema } from 'zod/schema';
import { InternalServerError } from 'errors/internal-server-error';
import emailService from 'libs/email.lib';
import { Role as RoleForBody } from 'interfaces/libs';
import { z } from 'zod';

// import { Role } from 'interfaces/libs';
import { ChannelType, Event, InviteStatus, Role, RSVPStatus } from '@prisma/client';

class EventsController extends AbstractController {
  getAllEventsByUserId() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;

          const guests = await this.ctx.guests.findMany({
            where: {
              userId,
            },
          });

          let allEvents: Event[] = [];

          for (const guest of guests) {
            const guestEvents = await this.ctx.events.findMany({
              where: {
                guests: {
                  some: {
                    guestId: guest.id,
                  },
                },
              },
            });

            allEvents = [...guestEvents];
          }

          const hostedEvents = await this.ctx.events.findMany({
            where: {
              host: {
                userId: userId,
              },
            },
          });

          const vendors = await this.ctx.vendors.findMany({
            where: {
              userId,
            },
          });

          for (const vendor of vendors) {
            const vendorEvents = await this.ctx.events.findMany({
              where: {
                guests: {
                  some: {
                    guestId: vendor.id,
                  },
                },
              },
            });

            allEvents = [...allEvents, ...vendorEvents];
          }

          allEvents = [...allEvents, ...hostedEvents];

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

          // Check this
          await this.ctx.eventTheme.create({
            data: {
              event: {
                connect: {
                  id: event.id,
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

              guests: {
                include: {
                  guest: {
                    include: {
                      rsvps: true,
                    },
                  },
                },
              },

              vendors: {
                include: {
                  vendor: true,
                },
              },

              guestPosts: true,

              rsvps: true,
              channels: true,
              eventPosts: true,
              eventFloorPlan: true,
              eventPolls: {
                include: {
                  options: {
                    include: {
                      eventPollOptionSelection: true,
                    }
                  },
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
          const { id: eventId, role } = req.params as unknown as { id: string; role: RoleForBody };

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
          }); // >>>>>>> main
          14;

          res.sendStatus(200);
        } catch (e: unknown) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  private createVendorDM(name: string, roleId: string, eventId: string) {
    return async () => {
      try {
        const event = (await this.ctx.events.findUnqiue({
          where: {
            id: eventId,
          },
        })) as Event;

        const hostId = event.hostId;
        const channel = await this.ctx.channels.create({
          data: {
            name,
            channelType: ChannelType.DIRECT,
            event: {
              connect: {
                id: eventId,
              },
            },
          },
        });

        const channelParticipantHost = await this.ctx.channelParticipants.create({
          data: {
            role: Role.HOST,
            channel: {
              connect: {
                id: channel.id,
              },
            },
            host: {
              connect: {
                id: hostId,
              },
            },
          },
        });

        console.log(channelParticipantHost);

        const channelParticipantVendor = await this.ctx.channelParticipants.create({
          data: {
            role: Role.VENDOR,
            channel: {
              connect: {
                id: channel.id,
              },
            },
            vendor: {
              connect: {
                id: roleId,
              },
            },
          },
        });

        console.log(channelParticipantVendor);
      } catch (e) {
        console.error(e);
      }
    };
  }

  private addGuestToChannels(eventId: string, roleId: string) {
    return async () => {
      const channels = await this.ctx.channels.findMany({
        where: {
          AND: [{ eventId }, { channelType: ChannelType.PUBLIC }],
        },
      });

      for (const channel of channels) {
        const channelId = channel.id;
        const channelParticipant = await this.ctx.channelParticipants.create({
          data: {
            role: Role.GUEST,
            channel: {
              connect: {
                id: channelId,
              },
            },
            guest: {
              connect: {
                id: roleId,
              },
            },
          },
        });
        console.log(channelParticipant);
      }
    };
  }

  acceptInvite() {
    return [
      validateRequestParams(z.object({ id: z.string(), inviteId: z.string(), role: z.enum(['guest', 'vendor']) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id: eventId, inviteId, role } = req.params as unknown as { id: string; inviteId: string; role: RoleForBody };
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

            await this.ctx.rsvp.create({
              data: {
                event: {
                  connect: {
                    id: eventId,
                  },
                },
                guest: {
                  connect: {
                    id: guest?.id,
                  },
                },
                status: 'PENDING',
              },
            });

            const addGuest = this.addGuestToChannels(eventId, guest?.id as string);
            addGuest();
          } else {
            const vendor = await this.ctx.vendors.createVendorByUserId(userId);

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

            const createDM = this.createVendorDM(vendor?.name as string, vendor?.id as string, eventId);
            createDM();

            await this.ctx.contracts.create({
              data: {
                vendor: {
                  connect: {
                    id: vendor?.id,
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

  getRole() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id: eventId } = req.params as { id: string };
          const currentUserId = req.session.currentUserId as string;

          const host = await this.ctx.hosts.findFirst({
            where: {
              AND: [
                { userId: currentUserId },
                {
                  events: {
                    some: { id: eventId },
                  },
                },
              ],
            },
          });

          if (host) {
            console.log(host);
            return res.status(200).json({
              role: 'host',
              data: host,
            });
          }

          const guest = await this.ctx.guests.findFirst({
            where: {
              AND: [
                { userId: currentUserId },
                {
                  events: {
                    some: { eventId },
                  },
                },
              ],
            },
          });

          if (guest) {
            console.log(guest);
            return res.status(200).json({
              role: 'guest',
              data: guest,
            });
          }

          const vendor = await this.ctx.vendors.findFirst({
            where: {
              AND: [
                { userId: currentUserId },
                {
                  events: {
                    some: { eventId },
                  },
                },
              ],
            },
          });

          if (vendor) {
            console.log(vendor);
            return res.status(200).json({
              role: 'vendor',
              data: vendor,
            });
          }
        } catch (e) {
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

          const poll = await this.ctx.eventPolls.findUnqiue({
            where: {
              id: eventPoll.id,
            },
            include: {
              options: true,
            },
          });

          res.status(200).json({ data: poll });
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
              options: {
                include: {
                  eventPollOptionSelection: true,
                }
              },
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

  private createPollOptionSelection(userId: string, pollOptionId: string) {
    return async () => {
      await this.ctx.eventPollOptionsSelection.create({
        data: {
          user: {
            connect: {
              id: userId,
            }
          },
          eventPollOption: {
            connect: {
              id: pollOptionId,
            }
          }
        }
      });
    }
  }

  updatePollById() {
    return [
      validateRequestParams(z.object({ id: z.string(), pollId: z.string() })),
      validateRequestBody(updatePollOptionSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { pollId } = req.params as { pollId: string };
          const userId = req.session.currentUserId as string;

          const { pollOptionId } = req.body as { pollOptionId: string };

          const eventPoll = await this.ctx.eventPolls.findUnqiue({
            where: { id: pollId },
          });

          if (!eventPoll) {
            return res.sendStatus(400);
          }

          const updatedOption = await this.ctx.eventPollOptions.update({
            where: {
              id: pollOptionId,
            },
            data: {
              count: {
                increment: 1,
              }
            }
          });

          if (!updatedOption) {
            return res.sendStatus(404);
          }

          const selection = this.createPollOptionSelection(userId, updatedOption.id);
          selection();

          res.status(200).send({
            data: 'Successfully updated',
          });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
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

          const venue = await this.ctx.eventFloorPlans.create({
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

          res.status(200).send({ data: venue });
        } catch (error) {
          console.error(error);
          next(new InternalServerError());
        }
      },
    ];
  }

  acceptRSVP() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(z.object({ plusOnes: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          const { id: eventId } = req.params as unknown as { id: string };
          const { plusOnes } = req.body as unknown as { plusOnes: string };

          const guest = await this.ctx.guests.findFirst({
            where: {
              userId: userId,
              events: {
                some: {
                  eventId: eventId,
                },
              },
            },
          });

          if (!guest) {
            return res.status(404).json({ data: 'Guest not found' });
          }

          const rsvp = await this.ctx.rsvp.update({
            where: {
              eventId: eventId,
              guestId: guest?.id,
            },
            data: {
              status: RSVPStatus.CONFIRMED,
            },
          });

          // updating the plus ones
          await this.ctx.guests.update({
            where: {
              id: guest?.id,
            },
            data: {
              plusOnes: parseInt(plusOnes, 10),
            },
          });

          res.status(200).send({ data: rsvp });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  declineRSVP() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          const { id: eventId } = req.params as unknown as { id: string };

          const guest = await this.ctx.guests.findFirst({
            where: {
              userId: userId,
              events: {
                some: {
                  eventId: eventId,
                },
              },
            },
          });

          if (!guest) {
            return res.status(404).json({ data: 'Guest not found' });
          }

          const rsvp = await this.ctx.rsvp.update({
            where: {
              eventId: eventId,
              guestId: guest?.id,
            },
            data: {
              status: RSVPStatus.CANCELLED,
            },
          });

          res.status(200).send({ data: rsvp });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getEventTheme() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId;
          const { id: eventId } = req.params as unknown as { id: string };

          console.log(eventId, userId);

          const theme = await this.ctx.eventTheme.findFirst({
            where: {
              eventId,
            },
          });

          res.status(200).json({ data: theme });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  updateEventTheme() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(z.object({ primaryColor: z.string(), textColor: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id: eventId } = req.params as unknown as { id: string };
          const { primaryColor, textColor } = req.body as unknown as { primaryColor: string; textColor: string };

          // also need to check whether the user is the host of the event
          const theme = await this.ctx.eventTheme.upsert({
            where: {
              eventId,
            },
            create: {
              primaryColor,
              textColor,
              event: {
                connect: {
                  id: eventId,
                },
              },
            },
            update: {
              primaryColor,
              textColor,
            },
          });

          res.status(201).json({
            data: theme,
          });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createGuestPost() {
    return [
      validateRequestParams(z.object({ id: z.string() })),
      validateRequestBody(z.object({ text: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          const { id: eventId } = req.params as unknown as { id: string };

          const { text } = req.body as unknown as { text: string };

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
            return res.status(404).json({ data: 'Guest not found' });
          }

          const guestPost = await this.ctx.guestPost.create({
            data: {
              text,
              guest: {
                connect: {
                  id: guest.id,
                },
              },
              event: {
                connect: {
                  id: eventId,
                },
              },
            },
          });

          res.status(201).json({
            data: guestPost,
          });
        } catch (e) {
          console.log(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default EventsController;
