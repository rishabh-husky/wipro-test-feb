"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARFormat = exports.resourceTypes = void 0;
var resourceTypes;
(function (resourceTypes) {
    resourceTypes["fetch"] = "fetch";
    resourceTypes["document"] = "document";
    resourceTypes["other"] = "other";
    resourceTypes["stylesheet"] = "stylesheet";
    resourceTypes["image"] = "image";
    resourceTypes["script"] = "script";
    resourceTypes["font"] = "font";
})(resourceTypes = exports.resourceTypes || (exports.resourceTypes = {}));
class HARFormat {
    constructor() {
        this.log = {
            version: "",
            entries: [],
            pages: [],
            creator: {},
        };
    }
}
exports.HARFormat = HARFormat;
