import { CustomError } from './cutsom-error';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('Route not found!');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{ message: 'The route you are looking for is not available!' }];
	}
}