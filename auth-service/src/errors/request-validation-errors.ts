
import { ValidationError } from 'express-validator';

// import the custom errors
import { CustomError } from './cutsom-error';

export class RequestValidationError extends CustomError {

	public statusCode: number = 400;

	constructor(public formattedErrors: ValidationError[]) {
		super('Invalid input parameters!');

		// Only because we are extending an in-built class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors() {
		return this.formattedErrors.map(error => {
			return {
				message: error.msg,
				parameter: error.param
			}
		});
	}

}