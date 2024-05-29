import { InternalServerError } from "errors/internal-server-error";
import AbstractController from "./index.controller"
import { Request, Response, NextFunction } from "express";
import { z } from 'zod';
import { ContractStatus } from "@prisma/client";
import { validateRequestBody, validateRequestParams } from "validators/validateRequest";

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
                        }
                    });

                    if (!contract) {
                        return res.status(400).send({ error: 'Contract not found' });
                    }

                    return res.status(200).send({ data: contract });
                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

    updateContractData() {
        return [
            validateRequestParams(z.object({ contractId: z.string() })),
            validateRequestBody(z.object({ contractData: z.string() })),
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { contractId } = req.params as { contractId: string };
                    const { contractData } = req.body as { contractData: string };
  
                    const contract = await this.ctx.contracts.update({
                        where: {
                            id: contractId,
                        },
                        data: {
                            contractData
                        }
                    });

                    if (!contract) {
                        return res.status(400).send({ error: 'Contract not found' });
                    }

                    return res.status(200).send({ data: contract });

                } catch (e) {
                    console.error(e);
                    next(new InternalServerError());
                }
            }
        ];
    }

}
