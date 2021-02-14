"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HAREntry {
    constructor(_resourceType, request, response) {
        this._resourceType = _resourceType;
        this.request = request;
        this.response = response;
    }
    getHost() {
        const url = new URL(this.request.url);
        return url.hostname;
    }
    getResponseStatusCode() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.status;
    }
    getResponseMethod() {
        var _a;
        return (_a = this.request) === null || _a === void 0 ? void 0 : _a.method;
    }
    isErroneous() {
        return this.response.status === 500;
    }
    getResponseBody() {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.content;
    }
}
exports.default = HAREntry;
