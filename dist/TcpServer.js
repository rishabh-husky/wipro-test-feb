"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const { promisify } = require("util");
class TcpServer {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        console.log(`Creating connection on ${host}:${port}`);
        let client;
        try {
            client = redis_1.createClient({
                host,
                port,
            });
        }
        catch (e) {
            console.log(`Error Connecting to tcp server: ${e.message}`);
            throw e;
        }
        console.log(`Connected on ${host}:${port}`);
        this.setPromise = promisify(client.set).bind(client);
        this.existsPromise = promisify(client.exists).bind(client);
    }
    async store(key, content) {
        let res = false;
        try {
            console.log("Storing in tcp");
            res = await this.setPromise(key, content);
            console.log("Stored in tcp", key, content);
        }
        catch (e) {
            console.log(`Error Storing to tcp server: ${e.message}`);
            throw e;
        }
        return res;
    }
    async exists(key) {
        let res = false;
        try {
            console.log("Checking key in tcp");
            res = await this.existsPromise(key);
        }
        catch (e) {
            console.log(`Checking key to tcp server: ${e.message}`);
            throw e;
        }
        return res;
    }
}
exports.default = TcpServer;
