import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const login = (req: Request, res: Response) => {
	console.log(`From the Auth Controller!`);
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		// return res.status(400).json({ errors: errors.array() });
		// throw new Error('Email or password is invalid!');	
		throw new RequestValidationError(errors.array());
	}

	throw new DatabaseConnectionError();

	return res.status(200).json(req.body);
}

export { login };