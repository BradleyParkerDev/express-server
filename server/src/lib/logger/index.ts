// import winston from 'winston';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// // ✅ Polyfill __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure logs directory exists
// const logDirectory = path.join(__dirname, '../../../logs');
// if (!fs.existsSync(logDirectory)) {
// 	fs.mkdirSync(logDirectory, { recursive: true });
// }

// // Create a log format
// const logFormat = winston.format.combine(
// 	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
// 	winston.format.printf(({ timestamp, level, message }) => {
// 		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
// 	}),
// );

// // Create a logger instance
// const logger = winston.createLogger({
// 	level: 'info',
// 	format: logFormat,
// 	transports: [
// 		new winston.transports.File({
// 			filename: path.join(logDirectory, `server.log`),
// 		}), // Server logs
// 	],
// });

// // Function to create a separate logger for a specific route
// const createNewLogger = (loggerName: string) => {
// 	return winston.createLogger({
// 		level: 'info',
// 		format: logFormat,
// 		transports: [
// 			new winston.transports.File({
// 				filename: path.join(logDirectory, `${loggerName}.log`),
// 			}),
// 		],
// 	});
// };

// // ✅ Centralized logger registry for domain-specific logging
// export const loggerFactory = {
// 	auth: createNewLogger('auth'), // For authentication routes and services
// 	user: createNewLogger('user'), // For user-related operations
// 	index: createNewLogger('index'), // For root routes or startup events
// 	cron: createNewLogger('cronJobs'), // For background cron job logs
// 	// Add more named loggers here as needed
// };

// // Export the main server logger
// export default logger;

import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Resolves the current filename in ESM.
 * Equivalent to `__filename` in CommonJS.
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Resolves the current directory name in ESM.
 * Equivalent to `__dirname` in CommonJS.
 */
const __dirname = path.dirname(__filename);

/**
 * Directory where log files are stored.
 * Relative to project root: `./logs`
 */
const logDirectory = path.join(__dirname, '../../../../logs');

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory, { recursive: true });
}

/**
 * Winston log format configuration.
 * Includes timestamp and uppercase log level.
 */
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
	}),
);

/**
 * Main Winston logger for general server events.
 * Logs are saved to `logs/server.log`.
 */
const logger = winston.createLogger({
	level: 'info',
	format: logFormat,
	transports: [
		new winston.transports.File({
			filename: path.join(logDirectory, `server.log`),
		}),
	],
});

/**
 * Creates a new Winston logger for a specific domain or feature.
 * Logs are saved to `logs/{loggerName}.log`.
 *
 * @param loggerName - A label for the logger (e.g., "auth", "user", "cronJobs").
 * @returns A configured Winston logger instance.
 */
const createNewLogger = (loggerName: string): winston.Logger => {
	return winston.createLogger({
		level: 'info',
		format: logFormat,
		transports: [
			new winston.transports.File({
				filename: path.join(logDirectory, `${loggerName}.log`),
			}),
		],
	});
};

/**
 * Centralized logger registry for domain-specific loggers.
 *
 * - `auth`: For authentication routes and services
 * - `user`: For user-related operations
 * - `index`: For root routes or startup events
 * - `cron`: For background cron job logs
 */
export const loggerFactory = {
	auth: createNewLogger('auth'),
	user: createNewLogger('user'),
	index: createNewLogger('index'),
	cron: createNewLogger('cronJobs'),
};

// Export the main logger as default
export default logger;
