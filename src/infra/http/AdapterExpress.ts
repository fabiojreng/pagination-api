import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";

export default class AdapterExpress implements HttpServer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  register(method: string, url: string, callback: Function): void {
    return this.app[method](url, async function (req: Request, res: Response) {
      try {
        const { statusCode, body } = await callback(req);
        res.status(statusCode).json(body);
      } catch (error) {
        if (error instanceof Error) res.status(400).json(error.message);
        res.status(400).json("Unexpected error");
      }
    });
  }
  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`SERVER RUNNING IN PORT ${port}`);
    });
  }
}
