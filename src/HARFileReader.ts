import { File } from "./types/global.types";
import { HARFormat } from "./types/har.types";

const path = require("path");
const fs = require("fs");

export default class HARFileReader {
  constructor(private file: File) {}

  async read() {
    let content: string = "";
    const harPath = path.join(__dirname, "..", this.file.path);
    content = fs.readFileSync(harPath, "utf-8");
    return content;
  }

  static parse(fileContent: string): HARFormat {
    const har: HARFormat = JSON.parse(fileContent);
    return har;
  }
}
