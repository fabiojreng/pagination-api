import UseCase from "../../application/useCases/UseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private filterDocuments: UseCase,
    private getById: UseCase,
    private countDocuments: UseCase,
    private latestPosts: UseCase,
    private server: HttpServer
  ) {
    this.server?.register("get", "/search", async (req: any) => {
      const output = await this.filterDocuments.execute(req.query);
      return output;
    });
    this.server?.register("get", "/get-by-Id/:id", async (req: any) => {
      const output = await this.getById.execute(req.params);
      return output;
    });
    this.server?.register("get", "/count-documents", async (req: any) => {
      const output = await this.countDocuments.execute(req.query);
      return output;
    });
    this.server?.register("get", "/latest-posts", async () => {
      const output = await this.latestPosts.execute({});
      return output;
    });
  }
}
