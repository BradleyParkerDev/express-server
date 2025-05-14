import express, { Request, Response } from 'express';
import { loggerFactory } from '../lib/logger/index.js';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
	res.send('Hello, World! This is an express server written in TypeScript!');
	loggerFactory.index.info('Get request made to index route!');
});
export default router;
