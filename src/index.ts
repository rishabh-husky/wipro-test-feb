import express, { NextFunction, Request, Response } from "express";
import harUploader from "./HARUploadMiddleware";
import handler from "./handler";

const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("APP is mounted at GET:/");
});

app.post("/", [harUploader.single("har")], handler);

app.listen(port, () => {
  console.log("App is listening on ", port);
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  res.status(500).send({ message: err.message });
});
