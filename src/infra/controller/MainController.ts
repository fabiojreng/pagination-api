import { FindByAuthorUseCase } from "../../application/useCases/FindByAuthorUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private findByAuthor: FindByAuthorUseCase,
    private server: HttpServer
  ) {
    server.register(
      "get",
      "/search/author",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (query: any) {
        const { author, page } = query;
        const documents = await findByAuthor.execute(author, page);
        return { statusCode: 200, body: documents };
      }
    );
  }
}
