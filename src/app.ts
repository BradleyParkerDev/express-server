import dotenv from 'dotenv';
import { HttpError } from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';

// Load environment variables
dotenv.config();

// App creation
const app = express();

// Middleware
app.use(
	cors({
		origin: 'http://localhost:4001', // React app's URL
		credentials: true, // Allow cookies and other credentials
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define routes
app.use('/', indexRouter);
app.use('/api/user', userRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
app.use((err: unknown, req: express.Request, res: express.Response) => {
	let status = 500;
	let message = 'Internal Server Error';

	if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
		const typedErr = err as HttpError;
		status = typedErr.status || 500;
		message = typedErr.message;
	}

	res.status(status).json({
		message,
		error: req.app.get('env') === 'development' ? err : {},
	});
});

export default app;
