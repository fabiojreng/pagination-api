import { FilterDocumentsUseCase } from "../../application/useCases/FilterDocumentsUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private filterDocuments: FilterDocumentsUseCase,
    private server: HttpServer
  ) {
    server.register(
      "get",
      "/search",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (query: any) {
        const { type, value, page } = query;
        const documents = await filterDocuments.execute(type, value, page);
        return { statusCode: 200, body: documents };
      }
    );
  }
}
