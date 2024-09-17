import express, { Request, Response } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World! This is an express server written in TypeScript!');
});
export default router;
