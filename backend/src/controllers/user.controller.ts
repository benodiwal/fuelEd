import { Request, Response } from "express";
import AbstractController from "./index.controller";

class UserController extends AbstractController {
    getLogout() {
        return [
            (req: Request, res: Response) => {
                req.session.currentUserId = undefined;
                return res.sendStatus(204);
            }
        ];
    }
}

export default UserController;
