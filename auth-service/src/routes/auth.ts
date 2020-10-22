import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

// import the controllers
import { login } from '../controllers/Auth';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ msg: 'Auth GET route'});
});

router.post('/signup', [
		body('userid').isEmail().withMessage('You must provide a valid email id'),
		body('password').trim().isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 and 20 characters')
	],
	login);

export default router;