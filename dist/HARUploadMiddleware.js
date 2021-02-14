"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileFilter = async (req, file, cb) => {
    try {
        if (!file) {
            cb(new Error("Har field is required."));
        }
        const fileSplit = file.originalname.split(".");
        const fileSplitLength = fileSplit.length;
        if (fileSplitLength && fileSplit[fileSplitLength - 1] === "har") {
            cb(null, true);
        }
        else {
            cb(new Error("Only har file are supported."));
        }
    }
    catch (e) {
        cb(e);
    }
};
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads");
    },
    filename(req, file, cb) {
        try {
            const randomFraction = parseFloat(Math.random().toExponential(15));
            const randomNumber = (randomFraction * 10e15).toFixed();
            cb(null, `har${randomNumber}.json`);
        }
        catch (e) {
            cb(e, file.originalname);
        }
    },
});
const harUploader = multer_1.default({
    dest: "./uploads",
    fileFilter,
    storage,
});
exports.default = harUploader;
