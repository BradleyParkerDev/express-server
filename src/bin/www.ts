#!/usr/bin/env node

import dotenv from 'dotenv';
import app from '../app';
import http from 'http';
import { serverUtil } from '../lib/server';
import logger from '../lib/logger';

dotenv.config(); // Add this line to load environment variables


/**
 * Get port from environment and store in Express.
 */
const port = serverUtil.normalizePort(process.env.PORT || '4000');
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
	serverUtil.onError(error, port)
});
server.on('listening', () => {
	const addressInfo = server.address();
	serverUtil.onListening(addressInfo); 
	logger.info(`Server started on port ${port}.`)
});