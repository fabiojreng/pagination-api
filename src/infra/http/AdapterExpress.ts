import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import HttpResponse from "../../domain/entities/Protocols/HttpResponse";
//import cors from "cors";

export default class AdapterExpress implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    //this.app.use(cors());
  }
  register(method: string, url: string, callback: Function): any {
    return this.app[method](url, async function (req: Request, res: Response) {
      try {
        const output: HttpResponse = await callback(req);
        res.status(output.statusCode).json(output.body);
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
