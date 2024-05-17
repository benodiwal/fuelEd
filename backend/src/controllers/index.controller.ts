import { IContext } from "interfaces";

export default abstract class AbstractController {
    ctx: IContext;
    constructor(ctx: IContext) {
        this.ctx = ctx;
    }
}
