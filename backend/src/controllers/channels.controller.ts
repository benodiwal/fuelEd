import { Request, Response } from 'express';
import { ChannelType } from '@prisma/client';
import AbstractController from './index.controller';

export default class ChannelsController extends AbstractController {
  private getChannelType(type: string): ChannelType | undefined {
    if (type !== 'public' && type !== 'private' && type !== 'direct') {
      return undefined;
    }
    if (Object.values(ChannelType).includes(type)) {
      const channelType: ChannelType = type;
      return channelType;
    }
    return undefined;
  }

  async getChannels(_: Request, res: Response) {
    try {
      const channels = this.ctx.channels.findMany({
        include: {
          participants: true,
          messages: {
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      });
      res.json(channels);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getChannelById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const channel = await this.ctx.channels.findUnqiue({
        where: {
          id: parseInt(id, 10),
        },
      });
      if (channel) {
        return res.status(200).json(channel);
      } else {
        return res.status(404).send({ message: 'Channel not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getChannelByType(req: Request, res: Response) {
    const { type } = req.params;

    if (!this.getChannelType(type)) {
      res.status(500).send({ message: 'Invalid type' });
    }

    try {
      const channels = await this.ctx.channels.findMany({
        where: {
          channelType: this.getChannelType(type),
        },
        include: {
          participants: true,
          messages: {
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      });
      res.json(channels);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createChannel(req: Request, res: Response) {
    const { name, type, eventId, hostId } = req.params;

    const channelType = this.getChannelType(type);
    if (!channelType) {
      res.status(500).send({ message: 'Invalid type' });
      return;
    }

    try {
      const channel = await this.ctx.channels.create({
        data: {
          name,
          channelType,
          eventId: parseInt(eventId, 10),
          participants: {
            connect: [{ id: parseInt(hostId, 10) }],
          },
        },
        include: {
          participants: true,
          messages: true,
        },
      });
      res.status(201).json(channel);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // async updateChannelById(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const { name, type, eventId } = req.params;

  //     const channelType = this.getChannelType(type);
  //     if (!channelType) {
  //         res.status(500).send({ message: "Invalid type" });
  //         return;
  //     }

  //     try {
  //         const channel = await this.ctx.channels.update{{
  //             where: {
  //                 id,
  //             },
  //             data:
  //         }};
  //     } catch (error) {
  //         res.status(500).send(error);
  //     }
  // }

  async sendMessage(req: Request, res: Response) {
    const { id } = req.params;
    const { senderId, message } = req.params;

    try {
      const channelMessage = await this.ctx.channelMessages.create({
        data: {
          channelId: parseInt(id, 10),
          senderId: parseInt(senderId, 10),
          message,
          timestamp: new Date(),
        },
      });

      await this.ctx.channels.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          messages: {
            connect: [{ id: channelMessage.id }],
          },
        },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
