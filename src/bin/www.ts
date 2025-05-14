#!/usr/bin/env node
import dotenv from 'dotenv';
import app from '../app.js';
import http from 'http';
import { serverUtil } from '../lib/server/index.js';
import logger from '../lib/logger/index.js';

// Load environment variables
dotenv.config();

/**
 * Get port from environment variables and store in Express.
 */
const port = serverUtil.normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', (error) => {
	serverUtil.onError(error, port);
});
server.on('listening', () => {
	const addressInfo = server.address();
	serverUtil.onListening(addressInfo);
	logger.info(`Server started on port ${port}.`);
	serverUtil.registerShutdownHandlers(server); // 🔥 Register graceful shutdown hooks
});
