import { UnauthorizedError } from "errors/unauthorized-error";
import { NextFunction, Request, Response } from "express"

export const isAuthenticated = () => {
    return (req: Request, _: Response, next: NextFunction) => {
        if (!req.session.currentUserId) {
            return next(new UnauthorizedError());
        }
        next();
    }
}
