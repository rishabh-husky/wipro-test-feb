"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
class HARFileReader {
    constructor(file) {
        this.file = file;
    }
    async read() {
        let content = "";
        const harPath = path.join(__dirname, "..", this.file.path);
        content = fs.readFileSync(harPath, "utf-8");
        return content;
    }
    static parse(fileContent) {
        const har = JSON.parse(fileContent);
        return har;
    }
}
exports.default = HARFileReader;
