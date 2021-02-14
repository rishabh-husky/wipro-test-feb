"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HARFileReader_1 = __importDefault(require("./HARFileReader"));
const HAREntries_1 = __importDefault(require("./HAREntries"));
const TcpServer_1 = __importDefault(require("./TcpServer"));
const handler = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(422).json({ message: ":har field is required" });
        }
        let tcpServer;
        if (typeof process.env.REDIS_HOST === "string" &&
            typeof process.env.REDIS_PORT === "string") {
            tcpServer = new TcpServer_1.default(process.env.REDIS_HOST, parseInt(process.env.REDIS_PORT, 10));
        }
        else {
            throw Error("Invalid TCP parameters.");
        }
        const reader = new HARFileReader_1.default(req.file);
        const content = await reader.read();
        const json = HARFileReader_1.default.parse(content);
        const entities = new HAREntries_1.default(json.log.entries);
        const parseResult = entities.getResults();
        const result = Object.assign(Object.assign({}, parseResult), { statusCodeCount: Object.keys(parseResult.diffStatusKey).length });
        const key = `har-${new Date().toISOString()}`;
        await tcpServer.store(key, JSON.stringify(result));
        const isStoredInTCPServer = await tcpServer.exists(key);
        res.status(200).json({
            message: "File uploaded and processed.",
            result: Object.assign(Object.assign({}, result), { isStoredInTCPServer }),
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = handler;
