import winston from "winston";
import path from "path";
import fs from "fs";


// Ensure logs directory exists
const logDirectory = path.join(__dirname, "../../../logs");
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory, { recursive: true });
}


// Create a log format
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
	})
);


// Create a logger instance
const logger = winston.createLogger({
	level: "info",
	format: logFormat,
	transports: [
		new winston.transports.File({ filename: path.join(logDirectory, `server.log`) }), // Server logs
	],
});
 

// Function to create a separate logger for a specific route
const createRouteLogger = (routeName: string) => {
	return winston.createLogger({
		level: "info",
		format: logFormat,
		transports: [
			new winston.transports.File({ filename: path.join(logDirectory, `${routeName}.log`) }),
		],
	});
};


// Create route-specific loggers
export const authLogger = createRouteLogger("auth");
export const userLogger = createRouteLogger("user");
export const indexLogger = createRouteLogger("index");


// Export the main server logger
export default logger;
