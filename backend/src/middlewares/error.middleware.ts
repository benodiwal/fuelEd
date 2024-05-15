import { CustomError } from 'errors/custom-error';
import { Request, Response } from 'express';

export const errorHandler = (error: Error, _: Request, res: Response) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).send({ errors: error.serializeErrors() });
  }
  console.log('here');
  return res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
