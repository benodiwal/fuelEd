import { InternalServerError } from 'errors/internal-server-error';
import AbstractController from './index.controller';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ContractStatus } from '@prisma/client';
import { validateRequestBody, validateRequestParams } from 'validators/validateRequest';

export default class ContractsController extends AbstractController {
  updateStatus() {
    return [
      validateRequestParams(z.object({ contractId: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { contractId } = req.params as { contractId: string };
          const contract = await this.ctx.contracts.update({
            where: {
              id: contractId,
            },
            data: {
              status: ContractStatus.SIGNED_BY_BOTH,
            },
          });

          if (!contract) {
            return res.status(400).send({ error: 'Contract not found' });
          }

          return res.status(200).send({ data: contract });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  createContract() {
    return [
      validateRequestBody(z.object({ vendorId: z.string(), contractData: z.string() })),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { contractData, vendorId } = req.body as { contractData: string; vendorId: string };

          const vendor = await this.ctx.vendors.findUnqiue({
            where: {
              id: vendorId,
            },
          });

          if (!vendor) {
            return res.status(400).send({ error: 'Vendor not found' });
          }

          const contract = await this.ctx.contracts.create({
            data: {
              contractData,
              vendor: {
                connect: {
                  id: vendor?.id,
                },
              },
            },
          });

          if (!contract) {
            return res.status(400).send({ error: 'Error in creating a contract' });
          }

          return res.status(200).send({ data: contract });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }

  getAllContractsByUserId() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.session.currentUserId as string;
          const eventId = req.eventId as string;

          const vendor = await this.ctx.vendors.findFirst({
            where: {
              userId,
              events: {
                some: {
                  eventId: eventId,
                },
              },
            },
            include: {
              contract: true,
            },
          });

          return res.status(200).send({ data: vendor });
        } catch (e) {
          console.error(e);
          next(new InternalServerError());
        }
      },
    ];
  }
}
