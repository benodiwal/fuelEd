import { isAuthenticated } from 'middlewares/isAuthenticated.middleware';
import AbstractRouter from '..';
import ContractsController from 'controllers/contracts.controller';

export default class ContractRouter extends AbstractRouter {
  registerMiddlewares() {
    return [isAuthenticated];
  }

  registerRoutes(): void {
    const contractsController = new ContractsController(this.ctx);

    this.registerGET('/all', contractsController.getAllContractsByUserId());

    this.registerPUT('/:contractId/status', contractsController.updateStatus());

    this.registerPOST('/create', contractsController.createContract());
  }
}
