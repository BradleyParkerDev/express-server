"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexLogger = exports.userLogger = exports.authLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure logs directory exists
const logDirectory = path_1.default.join(__dirname, "../../../logs");
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
// Create a log format
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
}));
// Create a logger instance
const logger = winston_1.default.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.join(logDirectory, `server.log`) }), // Server logs
    ],
});
// Function to create a separate logger for a specific route
const createRouteLogger = (routeName) => {
    return winston_1.default.createLogger({
        level: "info",
        format: logFormat,
        transports: [
            new winston_1.default.transports.File({ filename: path_1.default.join(logDirectory, `${routeName}.log`) }),
        ],
    });
};
// Create route-specific loggers
exports.authLogger = createRouteLogger("auth");
exports.userLogger = createRouteLogger("user");
exports.indexLogger = createRouteLogger("index");
// Export the main server logger
exports.default = logger;
