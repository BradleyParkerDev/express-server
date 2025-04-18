import http from 'http';
import debugModule from 'debug';
import { AddressInfo } from 'net';
import logger from '../logger';

const debug = debugModule('express:server');
let isServerListening = false; // ✅ Tracks state

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: string) => {
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
}


/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: NodeJS.ErrnoException, port: string | number | false) =>{
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
			logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			logger.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
} 


/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (addressInfo: string | AddressInfo | null) => {
	isServerListening = true;
	if (addressInfo) { 
		const bind = typeof addressInfo === 'string' 
        ? 'pipe ' + addressInfo 
        : 'port ' + addressInfo.port;

		debug(`Listening on ${bind}`);
	} else {
		debug(`Listening but no address info available`);
	}
}


/**
 * Register shutdown handlers for graceful shutdown.
 */
const registerShutdownHandlers = (server: http.Server) => {
	let shuttingDown = false;

	const shutdown = (signal: string) => {
		if (shuttingDown) return; // 🛡 Already shutting down
		shuttingDown = true;
	
		logger.info(`🛑 Received ${signal}. Shutting down...`);
	
		if (isServerListening) {
			server.close(() => {
				logger.info('✅ Server closed.');
				setTimeout(() => {
					if (signal === 'SIGUSR2') {
						process.kill(process.pid, 'SIGUSR2');
					} else {
						process.exit(0);
					}
				}, 100);
			});
		} else {
			logger.warn('⚠️ Server was not listening. Exiting.');
			setTimeout(() => {
				if (signal === 'SIGUSR2') {
					process.kill(process.pid, 'SIGUSR2');
				} else {
					process.exit(0);
				}
			}, 100);
		}
	};

	process.on('SIGINT', () => shutdown('SIGINT'));
	process.on('SIGTERM', () => shutdown('SIGTERM'));
	process.once('SIGUSR2', () => shutdown('SIGUSR2'));

	process.on('uncaughtException', (err) => {
		logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
		shutdown('uncaughtException');
	});

	process.on('unhandledRejection', (reason: any) => {
		logger.error(`Unhandled Rejection: ${reason?.message || reason}`);
		shutdown('unhandledRejection');
	});
};

export const serverUtil = {
    normalizePort,
    onError,
    onListening,
	registerShutdownHandlers   
}
