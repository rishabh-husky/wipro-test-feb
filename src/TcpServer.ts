import redis, { createClient, RedisClient } from "redis";

const { promisify } = require("util");

export default class TcpServer {
  private readonly setPromise;

  private readonly existsPromise;

  constructor(private host: string, private port: number) {
    console.log(`Creating connection on ${host}:${port}`);
    let client;
    try {
      client = createClient({
        host,
        port,
      });
    } catch (e) {
      console.log(`Error Connecting to tcp server: ${e.message}`);
      throw e;
    }
    console.log(`Connected on ${host}:${port}`);
    this.setPromise = promisify(client.set).bind(client);
    this.existsPromise = promisify(client.exists).bind(client);
  }

  async store(key: string, content: string): Promise<boolean> {
    let res = false;
    try {
      console.log("Storing in tcp");
      res = await this.setPromise(key, content);
      console.log("Stored in tcp", key, content);
    } catch (e) {
      console.log(`Error Storing to tcp server: ${e.message}`);
      throw e;
    }
    return res;
  }

  async exists(key: string): Promise<boolean> {
    let res = false;
    try {
      console.log("Checking key in tcp");
      res = await this.existsPromise(key);
    } catch (e) {
      console.log(`Checking key to tcp server: ${e.message}`);
      throw e;
    }
    return res;
  }
}
