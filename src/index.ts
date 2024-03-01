import dotenv from "dotenv";
import FilterDocumentsUseCase from "./application/useCases/FilterDocumentsUseCase";
import CountDocumentsUseCase from "./application/useCases/CountDocumentsUseCase.1";
import getDocumentByIdUseCase from "./application/useCases/GetDocumentByIdUseCase";
import LatestPostsUseCase from "./application/useCases/LatestPostsUseCase";
import MainController from "./infra/controller/MainController";
import AdapterMySQL from "./infra/dataBase/AdapterMySQL";
import AdapterExpress from "./infra/http/AdapterExpress";
import PaginationDB from "./infra/repository/PaginationDB";

dotenv.config();

const server = new AdapterExpress();
const connection = new AdapterMySQL();
const mysql = new PaginationDB(connection);
const filterDocuments = new FilterDocumentsUseCase(mysql);
const getById = new getDocumentByIdUseCase(mysql);
const countDocuments = new CountDocumentsUseCase(mysql);
const latestPosts = new LatestPostsUseCase(mysql);

new MainController(
  filterDocuments,
  getById,
  countDocuments,
  latestPosts,
  server
);

server.listen(3000);
