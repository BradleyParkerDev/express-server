import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ✅ Polyfill __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDirectory = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a log format
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
	}),
);

// Create a logger instance
const logger = winston.createLogger({
	level: 'info',
	format: logFormat,
	transports: [
		new winston.transports.File({
			filename: path.join(logDirectory, `server.log`),
		}), // Server logs
	],
});

// Function to create a separate logger for a specific route
const createNewLogger = (loggerName: string) => {
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

// ✅ Centralized logger registry for domain-specific logging
export const loggerFactory = {
	auth: createNewLogger('auth'), // For authentication routes and services
	user: createNewLogger('user'), // For user-related operations
	index: createNewLogger('index'), // For root routes or startup events
	cron: createNewLogger('cronJobs'), // For background cron job logs
	// Add more named loggers here as needed
};

// Export the main server logger
export default logger;
