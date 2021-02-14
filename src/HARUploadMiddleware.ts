import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { File } from "./types/global.types";

const fileFilter = async (req: Request, file: File, cb: FileFilterCallback) => {
  try {
    if (!file) {
      cb(new Error("Har field is required."));
    }
    const fileSplit = file.originalname.split(".");
    const fileSplitLength = fileSplit.length;
    if (fileSplitLength && fileSplit[fileSplitLength - 1] === "har") {
      cb(null, true);
    } else {
      cb(new Error("Only har file are supported."));
    }
  } catch (e) {
    cb(e);
  }
};

const storage = multer.diskStorage({
  destination(req: Request, file: File, cb: any) {
    cb(null, "./uploads");
  },
  filename(req: Request, file: File, cb: any) {
    try {
      const randomFraction: number = parseFloat(
        Math.random().toExponential(15)
      );
      const randomNumber: string = (randomFraction * 10e15).toFixed();
      cb(null, `har${randomNumber}.json`);
    } catch (e) {
      cb(e, file.originalname);
    }
  },
});

const harUploader = multer({
  dest: "./uploads",
  fileFilter,
  storage,
});

export default harUploader;
