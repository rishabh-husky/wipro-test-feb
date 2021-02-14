"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HARUploadMiddleware_1 = __importDefault(require("./HARUploadMiddleware"));
const handler_1 = __importDefault(require("./handler"));
const app = express_1.default();
const port = 3000;
app.get("/", async (req, res) => {
    res.status(200).send("APP is mounted at GET:/");
});
app.post("/", [HARUploadMiddleware_1.default.single("har")], handler_1.default);
app.listen(port, () => {
    console.log("App is listening on ", port);
});
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({ message: err.message });
});
