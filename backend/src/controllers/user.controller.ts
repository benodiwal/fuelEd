import { Request, Response } from 'express';
import AbstractController from './index.controller';

class UserController extends AbstractController {
  getLogout() {
    return [
      (req: Request, res: Response) => {
        req.session.currentUserId = undefined;
        return res.sendStatus(204);
      },
    ];
  }

  me() {
    return [
      async (req: Request, res: Response) => {
        try {
          const currentUserId = req.session.currentUserId;
          console.log('currentUserId', currentUserId);
          if (!currentUserId) {
            return res.sendStatus(404);
          }

          const user = await this.ctx.users.findUnqiue({
            where: {
              id: currentUserId,
            },
          });

          console.log('user', user);

          if (!user) {
            return res.sendStatus(404);
          }

          res.status(200).json({ data: user });
        } catch (e) {
          console.error(e);
          res.sendStatus(500);
        }
      },
    ];
  }
}

export default UserController;
