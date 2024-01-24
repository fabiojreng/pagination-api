import { FilterDocumentsUseCase } from "./application/useCases/FilterDocumentsUseCase";
import getDocumentByIdUseCase from "./application/useCases/GetDocumentByIdUseCase";
import MainController from "./infra/controller/MainController";
import AdapterMySQL from "./infra/dataBase/AdapterMySQL";
import AdapterExpress from "./infra/http/AdapterExpress";
import PaginationDB from "./infra/repository/PaginationDB";

const server = new AdapterExpress();
const connection = new AdapterMySQL();
const mysql = new PaginationDB(connection);
const filterDocuments = new FilterDocumentsUseCase(mysql);
const getById = new getDocumentByIdUseCase(mysql);

new MainController(filterDocuments, getById, server);

server.listen(3000);
