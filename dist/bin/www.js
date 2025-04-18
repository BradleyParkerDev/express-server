#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
const server_1 = require("../lib/server");
const logger_1 = __importDefault(require("../lib/logger"));
// Load environment variables
dotenv_1.default.config();
/**
 * Get port from environment variables and store in Express.
 */
const port = server_1.serverUtil.normalizePort(process.env.PORT || '3001');
app_1.default.set('port', port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', (error) => {
    server_1.serverUtil.onError(error, port);
});
server.on('listening', () => {
    const addressInfo = server.address();
    server_1.serverUtil.onListening(addressInfo);
    logger_1.default.info(`Server started on port ${port}.`);
    server_1.serverUtil.registerShutdownHandlers(server); // 🔥 Register graceful shutdown hooks
});
