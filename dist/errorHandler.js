"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render("error", { message: err.message });
};
exports.default = errorHandler;
