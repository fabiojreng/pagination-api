import CountDocumentsUseCase from "../../application/useCases/CountDocumentsUseCase";
import { FilterDocumentsUseCase } from "../../application/useCases/FilterDocumentsUseCase";
import getDocumentByIdUseCase from "../../application/useCases/GetDocumentByIdUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private filterDocuments: FilterDocumentsUseCase,
    private getById: getDocumentByIdUseCase,
    private countDocuments: CountDocumentsUseCase,
    private server: HttpServer
  ) {
    server.register(
      "get",
      "/search",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (req: any) {
        const { type, value, page } = req.query;
        const documents = await filterDocuments.execute(type, value, page);
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
        const { type, page } = req.query;
        const document = await countDocuments.execute(type, page);
        return { statusCode: 200, body: document };
      }
    );
  }
}
