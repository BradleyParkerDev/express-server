import express, { Request, Response } from 'express';
import { loggerFactory } from '../lib/logger/index.js';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
	res.send('Hello, from the user api!');
	loggerFactory.user.info('Get request made to the user api!');
});
export default router;
