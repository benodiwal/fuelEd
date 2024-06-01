import { InternalServerError } from "errors/internal-server-error";
import AbstractController from "./index.controller";
import { Request, Response, NextFunction } from "express";
import googleCalender from "libs/calender.lib";
import { validateRequestBody, validateRequestQuery } from "validators/validateRequest";
import { z } from "zod";
import { addEventSchema } from "zod/schema";
import Redis from "libs/redis.lib";
import { IContext } from "interfaces";

class CalenderController extends AbstractController {

    #redisService: Redis;
    #CALENDER: string;

    constructor(ctx: IContext) {
        super(ctx);
        this.#redisService = new Redis();
        this.#redisService.createConnection();
        this.#CALENDER = "calender";
    }

    generateAuthUrl() {
        return [
            validateRequestBody(z.object({ eventId: z.string() })),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { eventId } = req.body as { eventId: string };
                    const userId = req.session.currentUserId as string;

                    await this.#redisService.redis?.set(`${this.#CALENDER}-${userId}`, eventId);

                    const authUrl = googleCalender.generateAuthUrl();
                    res.redirect(authUrl);                    
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    getToken() {
        return[
            validateRequestQuery(z.object({ code: z.string() })),
             async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { code } = req.query as { code: string };
                    const userId = req.session.currentUserId as string;
                    await googleCalender.getToken(code);

                    const eventId = await this.#redisService.redis?.get(`${this.#CALENDER}-${userId}`);
                    res.redirect(`http://localhost:3000/events/${eventId}/overview`);
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }           
        ];
    }

    addEvent() {
        return [
            validateRequestBody(addEventSchema),
             async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { summary, description, start, end } = req.body as {
                        summary: string,
                        description: string,
                        start: string,
                        end: string,
                    };

                    await googleCalender.addEvent(summary, description, start, end);

                    res.send({ msg: 'Event added successfully' });
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }
}

export default CalenderController;
