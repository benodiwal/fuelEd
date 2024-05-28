import { NextFunction, Request, Response } from 'express';

export const forwardEventId = () => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { id: eventId } = req.params as { id: string };
    req.eventId = eventId;
    next();
  };
};
