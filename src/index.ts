import { FindByAuthorUseCase } from "./application/useCases/FindByAuthorUseCase";
import MainController from "./infra/controller/MainController";
import AdapterMySQL from "./infra/dataBase/AdapterMySQL";
import AdapterExpress from "./infra/http/AdapterExpress";
import PaginationDB from "./infra/repository/PaginationDB";

const server = new AdapterExpress();
const connection = new AdapterMySQL();
const mysql = new PaginationDB(connection);
const findByAuthor = new FindByAuthorUseCase(mysql);

new MainController(findByAuthor, server);

server.listen(3000);
