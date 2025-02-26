import express, { Request, Response } from 'express';
import { userLogger } from '../lib/logger';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, from the user api!');
    userLogger.info("Get request made to user api!")
});
export default router;
