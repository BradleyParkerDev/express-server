import express, { Request, Response } from 'express';
import { indexLogger } from '../lib/logger';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World! This is an express server written in TypeScript!');
    indexLogger.info("Get request made to index route!")
});
export default router;
