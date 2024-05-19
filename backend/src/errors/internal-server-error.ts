import { CustomError } from "./custom-error";

export class InternalServerError extends CustomError {
    statusCode = 500;
    reason = 'Internal Server Error';

    constructor() {
        super('Internal Server Error');
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined }[] {
        return [{ message: this.reason }];
    }

}
