import UseCase from "../../application/useCases/UseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private filterDocuments: UseCase,
    private getById: UseCase,
    private countDocuments: UseCase,
    private server: HttpServer
  ) {
    server.register(
      "get",
      "/search",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (req: any) {
        const documents = await filterDocuments.execute(req.query);
        return { statusCode: 200, body: documents };
      }
    );
    server.register(
      "get",
      "/getById/:id",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (req: any) {
        const document = await getById.execute(req.params.id);
        return { statusCode: 200, body: document };
      }
    );
    server.register(
      "get",
      "/countDocuments",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (req: any) {
        const document = await countDocuments.execute(req.query);
        return { statusCode: 200, body: document };
      }
    );
  }
}
