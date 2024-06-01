import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';
import AbstractController from './index.controller';
import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from 'errors/internal-server-error';
import { ChannelParticipant, ChannelType, Role } from '@prisma/client';

class ChannelController extends AbstractController {
  createChannel() {
    return [
      validateRequestBody(z.object({ name: z.string(), channelType: z.nativeEnum(ChannelType).refine((type) => type != ChannelType.DIRECT) })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, channelType } = req.body as unknown as { name: string; channelType: ChannelType };
          const eventId = req.eventId as string;
          console.log('EventId: ', eventId);
          const event = await this.ctx.events.findUnqiue({
            where: {
              id: eventId,
            },
          });

          if (!event) {
            return res.status(400).json({ error: 'Event not found' });
          }

          const guests = await this.ctx.guests.findMany({
            where: {
              events: {
                some: {
                  eventId,
                },
              },
            },
          });

          const hostId = event.hostId;

          const channel = await this.ctx.channels.create({
            data: {
              name,
              channelType,
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

          for (const guest of guests) {
            const channelParticipantGuest = await this.ctx.channelParticipants.create({
              data: {
                role: Role.GUEST,
                channel: {
                  connect: {
                    id: channel.id,
                  },
                },
                guest: {
                  connect: {
                    id: guest.id,
                  },
                },
              },
            });

            console.log(channelParticipantGuest);
          }

          console.log(channelParticipantHost);
          res.sendStatus(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createDM() {
    return [
      validateRequestBody(z.object({ name: z.string(), roleId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { name, roleId } = req.body as unknown as { name: string; roleId: string };
          const eventId = req.eventId as string;
          const event = await this.ctx.events.findUnqiue({
            where: {
              id: eventId,
            },
          });

          if (!event) {
            return res.status(400).json({ error: 'Event not found' });
          }

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

          res.status(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getChannelById() {
    return [
      validateRequestParams(z.object({ channelId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { channelId } = req.params as unknown as { channelId: string };
          const channel = await this.ctx.channels.findUnqiue({
            where: {
              id: channelId,
            },
            include: {
              channelMessages: true,
              channelParticipants: true,
            },
          });
          if (!channel) {
            res.status(400).json({ error: 'Channel not found' });
          }
          res.status(200).json({ data: channel });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  addParticipant() {
    return [
      validateRequestParams(z.object({ channelId: z.string(), role: z.nativeEnum(Role), roleId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { channelId, role, roleId } = req.params as unknown as { channelId: string; role: Role; roleId: string };

          let channelParticipant: ChannelParticipant | undefined = undefined;

          if (role == Role.GUEST) {
            channelParticipant = await this.ctx.channelParticipants.create({
              data: {
                role,
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
          } else if (role == Role.VENDOR) {
            channelParticipant = await this.ctx.channelParticipants.create({
              data: {
                role,
                channel: {
                  connect: {
                    id: channelId,
                  },
                },
                vendor: {
                  connect: {
                    id: roleId,
                  },
                },
              },
            });
          }

          console.log(channelParticipant);
          res.sendStatus(200);
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createMessage() {
    return [
      validateRequestParams(z.object({ channelId: z.string() })),
      validateRequestBody(z.object({ message: z.string(), roleId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { channelId } = req.params as unknown as { channelId: string };
          const { message, roleId } = req.body as unknown as { message: string; roleId: string };

          const sender = await this.ctx.channelParticipants.findFirst({
            where: {
              OR: [{ hostId: roleId }, { guestId: roleId }, { vendorId: roleId }],
            },
          });

          if (!sender) {
            return res.status(400).json({ error: 'Channel Paritcipant not found' });
          }

          const channelMessage = await this.ctx.channelMessages.create({
            data: {
              message,
              timestamp: new Date(),
              senderId: sender.id,
              channelId,
            },
          });

          console.log(channelMessage);

          res.status(200).json({ data: channelMessage });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getMessageById() {
    return [
      validateRequestParams(z.object({ channelId: z.string(), messageId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { messageId } = req.params as unknown as { messageId: string };
          const channelMessage = await this.ctx.channelMessages.findUnqiue({
            where: {
              id: messageId,
            },
          });
          if (!channelMessage) {
            return res.status(404).json({ error: 'Message not found' });
          }
          res.status(200).json({ data: channelMessage });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getAllMessages() {
    return [
      validateRequestParams(z.object({ channelId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { channelId } = req.params as unknown as { channelId: string };
          const channelMessages = await this.ctx.channelMessages.findMany({
            where: {
              channelId,
            },
            include: {
              sender: {
                include: {
                  guest: true,
                }
              }
            }
          });
          if (!channelMessages) {
            return res.status(404).json({ error: 'Message not found' });
          }
          res.status(200).json({ data: channelMessages });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  editMessage() {
    return [
      validateRequestParams(z.object({ channelId: z.string(), messageId: z.string() })),
      validateRequestBody(z.object({ message: z.string(), timestamp: z.date() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { messageId } = req.params as unknown as { messageId: string };
          const { message, timestamp } = req.body as unknown as { message: string; timestamp: Date };

          const channelMessage = await this.ctx.channelMessages.update({
            where: {
              id: messageId,
            },
            data: {
              message,
              timestamp,
            },
          });

          if (!channelMessage) {
            return res.status(404).json({ error: 'Message not found' });
          }

          res.status(201).json({ data: channelMessage });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}

export default ChannelController;
