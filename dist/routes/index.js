"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../lib/logger");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.send('Hello, World! This is an express server written in TypeScript!');
    logger_1.indexLogger.info("Get request made to index route!");
});
exports.default = router;
