import { validateRequestBody, validateRequestParams } from "validators/validateRequest";
import AbstractController from "./index.controller";
import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "errors/internal-server-error";
import { ChannelParticipant, ChannelType, Role } from "@prisma/client";

class ChannelController extends AbstractController {

    createChannel() {
        return [
            validateRequestBody(z.object({ name: z.string(), channelType: z.nativeEnum(ChannelType) })),
            async (req: Request, res: Response, next: NextFunction) => {
                try {

                    const { name, channelType } = req.body as { name: string, channelType: ChannelType };
                    // TODO: i have to write a middleware to forward the eventId as req.eventId
                    const eventId = "";
                    const event = await this.ctx.events.findFirst({
                        where: {
                            id: eventId,
                        }
                    });

                    if (!event) {
                        return res.status(404).json({error: "Event not found"});
                    }

                    const hostId = event.hostId;

                    const channel = await this.ctx.channels.create({
                        data: {
                            name,
                            channelType,
                            event: {
                                connect: {
                                    id: eventId,
                                }
                            }
                        }
                    });

                    const channelParticipantHost = await this.ctx.channelParticipants.create({
                        data: {
                            role: Role.HOST,
                            channel: {
                                connect: {
                                    id: channel.id,
                                }
                            },
                            host: {
                                connect: {
                                    id: hostId,
                                }
                            }
                        }
                    });

                    console.log(channelParticipantHost);
                    res.sendStatus(200);
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    createDM() {

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
                        }
                    });
                    if (!channel) {
                        res.status(404).json({data: 'Channel not found'});
                    }
                    res.status(200).json({data: channel});
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    addParticipant() {
        return [
            validateRequestParams(z.object({ channelId: z.string(), role: z.nativeEnum(Role), roleId: z.string() })),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { channelId, role, roleId } = req.params as unknown as { channelId: string, role: Role, roleId: string };
                    
                    let channelParticipant: ChannelParticipant | undefined = undefined;

                    if (role == Role.GUEST) {
                        channelParticipant = await this.ctx.channelParticipants.create({
                            data: {
                                role,
                                channel: {
                                    connect: {
                                        id: channelId,
                                    }
                                },
                                guest: {
                                    connect: {
                                        id: roleId,
                                    }
                                }
                            }
                        });
                        
                    } else if (role == Role.VENDOR) {
                        channelParticipant = await this.ctx.channelParticipants.create({
                            data: {
                                role,
                                channel: {
                                    connect: {
                                        id: channelId,
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: roleId,
                                    }
                                }
                            }
                        });

                    }

                    console.log(channelParticipant);
                    res.sendStatus(200);

                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }


}

export default ChannelController;
