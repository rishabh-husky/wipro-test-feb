"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HAREntry_1 = __importDefault(require("./HAREntry"));
class HAREntries {
    constructor(entries) {
        this.entries = entries;
    }
    getResults() {
        const result = {
            hostsKey: {},
            count: 0,
            diffStatusKey: {},
            erroneousResHost: [],
        };
        const entries = this.entries.forEach((entry) => {
            const entryInstance = new HAREntry_1.default(
            // eslint-disable-next-line no-underscore-dangle
            entry._resourceType, entry.request, entry.response);
            result.hostsKey[entryInstance.getHost()] = "";
            result.count += 1;
            result.diffStatusKey[entryInstance.getResponseStatusCode()] = "";
            if (entryInstance.isErroneous()) {
                result.erroneousResHost.push({
                    host: entryInstance.getHost(),
                    body: entryInstance.getResponseBody(),
                });
            }
        });
        return result;
    }
}
exports.default = HAREntries;
