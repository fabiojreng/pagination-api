import { FilterDocumentsUseCase } from "./application/useCases/FilterDocumentsUseCase";
import MainController from "./infra/controller/MainController";
import AdapterMySQL from "./infra/dataBase/AdapterMySQL";
import AdapterExpress from "./infra/http/AdapterExpress";
import PaginationDB from "./infra/repository/PaginationDB";

const server = new AdapterExpress();
const connection = new AdapterMySQL();
const mysql = new PaginationDB(connection);
const filterDocuments = new FilterDocumentsUseCase(mysql);

new MainController(filterDocuments, server);

server.listen(3000);
