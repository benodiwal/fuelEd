import { Request, Response } from "express";
import AbstractController from "./index.controller";

export default class EventsController extends AbstractController {
    
    async createEvent(req: Request, res: Response) {
        const { name, startDateTime, endDateTime, hostId, venueId } = req.body;
        try {
            const event = await this.ctx.events.create({
                data: {
                    name,
                    startDateTime: new Date(startDateTime),
                    endDateTime: new Date(endDateTime),
                    hostId: parseInt(hostId, 10),
                    venueId: parseInt(venueId, 10),
                }
            });

            // Create default channel
            await this.ctx.channels.create({
                data: {
                    name: `General-${event.id}`,
                    channelType: 'public',
                    eventId: event.id,
                    participants: {
                        connect: [{ id: hostId }],
                    }
                }
            });

            res.status(201).json(event);
        } catch (error) {
            res.status(500).send(error);
        }        
    }   
    
    async getEvents(_: Request, res: Response) {
        try {
            const events = await this.ctx.events.findMany({});
            res.json(events);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getEventById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const event = await this.ctx.events.findUnqiue({
                where: {
                    id: parseInt(id, 10),
                }
            });
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).send('Event not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateEventById(req: Request, res: Response) {
        const { id } = req.params;
        const { name, startDateTime, endDateTime, hostId, venueId } = req.body;
        try {
            const event = await this.ctx.events.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: {
                    name,
                    startDateTime: startDateTime,
                    endDateTime: endDateTime,
                    hostId: parseInt(hostId, 10),
                    venueId: parseInt(venueId, 10),
                }
            });
            if (event) {
                res.status(201).json(event);
            } else {
                res.status(404).send('Event not found');
            }
        } catch (error) {
            res.status(500).send(error);   
        }
    }

    async deleteEventById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.ctx.events.delete({
                where: {
                    id: parseInt(id, 10),
                }
            });
            res.status(204).send("Event deleted successfully");
        } catch (error) {
            res.status(500).send(error);
        }   
    }

    async addVendorToEvent(req: Request, res: Response) {
        const { eventId } = req.params;
        const { vendorId } = req.body;

        try {
            const event = await this.ctx.events.update({
                where: {
                    id: parseInt(eventId, 10),
                },
                data: {
                    vendors: {
                        connect: [{ id: vendorId }],
                    }
                }
            });
            res.json(event);
        } catch (error) {
            res.status(500).send(error);   
        }
    }

    async addGuestToEvent(req: Request, res: Response) {
        const { eventId } = req.params;
        const { guestId } = req.body;

        try {
            const event = await this.ctx.events.update({
                where: {
                    id: parseInt(eventId, 10),
                },
                data: {
                    vendors: {
                        connect: [{ id: guestId }],
                    }
                }
            });
            res.json(event);
        } catch (error) {
            res.status(500).send(error);   
        }
    }
}
