// import dotenv from 'dotenv';
// import { HttpError } from 'http-errors';
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import createError from 'http-errors';
// import indexRouter from './routes/index.js';
// import userRouter from './routes/user.js';

// // Load environment variables
// dotenv.config();

// // App creation
// const app = express();

// // Middleware
// app.use(
// 	cors({
// 		origin: 'http://localhost:4001', // React app's URL
// 		credentials: true, // Allow cookies and other credentials
// 	}),
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Define routes
// app.use('/', indexRouter);
// app.use('/api/user', userRouter);

// // Catch 404 and forward to error handler
// app.use((req, res, next) => {
// 	next(createError(404));
// });

// // Error handler
// app.use((err: unknown, req: express.Request, res: express.Response) => {
// 	let status = 500;
// 	let message = 'Internal Server Error';

// 	if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
// 		const typedErr = err as HttpError;
// 		status = typedErr.status || 500;
// 		message = typedErr.message;
// 	}

// 	res.status(status).json({
// 		message,
// 		error: req.app.get('env') === 'development' ? err : {},
// 	});
// });

// export default app;

import dotenv from 'dotenv';
import { HttpError } from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Creates and configures the Express application.
 * Includes middleware, routes, and error handling.
 *
 * @module app
 * @returns {express.Application} Configured Express app instance
 */
const app = express();

/**
 * Enable CORS to allow cross-origin requests from the React frontend.
 */
app.use(
	cors({
		origin: 'http://localhost:4001', // React app's URL
		credentials: true, // Allow cookies and other credentials
	}),
);

/**
 * Enable JSON and URL-encoded body parsing.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Enable cookie parsing middleware.
 */
app.use(cookieParser());

/**
 * Register primary application routes.
 *
 * @route /
 * @route /api/user
 */
app.use('/', indexRouter);
app.use('/api/user', userRouter);

/**
 * Middleware to catch 404 Not Found and forward to error handler.
 */
app.use((req, res, next) => {
	next(createError(404));
});

/**
 * Centralized error handling middleware.
 *
 * @param err - The error object, which may include status and message.
 * @param req - The incoming request.
 * @param res - The outgoing response.
 */
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

/**
 * Default export: the configured Express app.
 */
export default app;
