import { Request, Response, NextFunction} from 'express';
import { CustomError } from '../errors/cutsom-error';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		console.log(err);
		return res.status(err.statusCode).json({
			errors: err.serializeErrors()
		});
	}

	return res.status(501).json({ errors: [{ message: 'Something went wrong!' }] });
}