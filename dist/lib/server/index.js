"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverUtil = void 0;
const debug_1 = __importDefault(require("debug"));
const logger_1 = __importDefault(require("../logger"));
const debug = (0, debug_1.default)('express:server');
let isServerListening = false; // ✅ Tracks state
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error, port) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            logger_1.default.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            logger_1.default.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (addressInfo) => {
    isServerListening = true;
    if (addressInfo) {
        const bind = typeof addressInfo === 'string'
            ? 'pipe ' + addressInfo
            : 'port ' + addressInfo.port;
        debug(`Listening on ${bind}`);
    }
    else {
        debug(`Listening but no address info available`);
    }
};
/**
 * Register shutdown handlers for graceful shutdown.
 */
const registerShutdownHandlers = (server) => {
    let shuttingDown = false;
    const shutdown = (signal) => {
        if (shuttingDown)
            return; // 🛡 Already shutting down
        shuttingDown = true;
        logger_1.default.info(`🛑 Received ${signal}. Shutting down...`);
        if (isServerListening) {
            server.close(() => {
                logger_1.default.info('✅ Server closed.');
                setTimeout(() => {
                    if (signal === 'SIGUSR2') {
                        process.kill(process.pid, 'SIGUSR2');
                    }
                    else {
                        process.exit(0);
                    }
                }, 100);
            });
        }
        else {
            logger_1.default.warn('⚠️ Server was not listening. Exiting.');
            setTimeout(() => {
                if (signal === 'SIGUSR2') {
                    process.kill(process.pid, 'SIGUSR2');
                }
                else {
                    process.exit(0);
                }
            }, 100);
        }
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.once('SIGUSR2', () => shutdown('SIGUSR2'));
    process.on('uncaughtException', (err) => {
        logger_1.default.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
        shutdown('uncaughtException');
    });
    process.on('unhandledRejection', (reason) => {
        logger_1.default.error(`Unhandled Rejection: ${(reason === null || reason === void 0 ? void 0 : reason.message) || reason}`);
        shutdown('unhandledRejection');
    });
};
exports.serverUtil = {
    normalizePort,
    onError,
    onListening,
    registerShutdownHandlers
};
