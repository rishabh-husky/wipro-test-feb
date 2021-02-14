import { NextFunction, Request, Response } from "express";
import HARFileReader from "./HARFileReader";
import HAREntries from "./HAREntries";
import TcpServer from "./TcpServer";

const handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(422).json({ message: ":har field is required" });
    }
    let tcpServer;
    if (
      typeof process.env.REDIS_HOST === "string" &&
      typeof process.env.REDIS_PORT === "string"
    ) {
      tcpServer = new TcpServer(
        process.env.REDIS_HOST,
        parseInt(process.env.REDIS_PORT, 10)
      );
    } else {
      throw Error("Invalid TCP parameters.");
    }
    const reader = new HARFileReader(req.file);
    const content = await reader.read();
    const json = HARFileReader.parse(content);
    const entities = new HAREntries(json.log.entries);
    const parseResult = entities.getResults();
    const result = {
      ...parseResult,
      statusCodeCount: Object.keys(parseResult.diffStatusKey).length,
    };
    const key = `har-${new Date().toISOString()}`;
    await tcpServer.store(key, JSON.stringify(result));
    const isStoredInTCPServer = await tcpServer.exists(key);
    res.status(200).json({
      message: "File uploaded and processed.",
      result: {
        ...result,
        isStoredInTCPServer,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default handler;
