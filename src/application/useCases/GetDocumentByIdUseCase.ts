import MissingParamError from "../../domain/entities/Errors/MissingParamError";
import NotFoundError from "../../domain/entities/Errors/NotFoundError";
import {
  notFound,
  serverError,
  success,
} from "../../domain/entities/Helpers/HttpHelper";
import HttpResponse from "../../domain/entities/Protocols/HttpResponse";
import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export default class getDocumentByIdUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      if (!params.id) return notFound(new MissingParamError("id"));
      const data = await this.repository.filterDocumentById(params.id);
      if (!data) if (!data) return notFound(new NotFoundError());
      return success({ message: "Document", data: data });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
type Input = {
  id: string;
};
