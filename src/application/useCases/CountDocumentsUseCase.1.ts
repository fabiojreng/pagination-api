import MissingParamError from "../../domain/entities/Errors/MissingParamError";
import {
  noContent,
  notFound,
  serverError,
  success,
} from "../../domain/entities/Helpers/HttpHelper";
import HttpResponse from "../../domain/entities/Protocols/HttpResponse";
import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export default class CountDocumentsUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      const permittedTypes = ["type_document", "area_CNPQ"];
      if (!permittedTypes.includes(params.type))
        return notFound(new MissingParamError("type_document or area_CNPQ"));
      const data = await this.repository.countDocuments(params.type);
      if (!data) return noContent();
      return success({ message: "Number of documents", data: data });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
type Input = {
  type: string;
};
