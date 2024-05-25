import express, { Request, Response } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World! The project rebuilt!');
});
export default router;
