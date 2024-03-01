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

export default class FilterDocumentsUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      const permittedTypes = ["author", "type_document", "area_CNPQ"];
      if (!permittedTypes.includes(params.type))
        return notFound(new MissingParamError(permittedTypes.toString()));
      if (!params.value) return notFound(new MissingParamError("value"));
      const data = await this.repository.filterDocuments(
        params.type,
        params.value,
        Number(params.page)
      );
      if (!data) return notFound(new NotFoundError());
      return success({ message: "", data: data });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
type Input = {
  type: string;
  value: string;
  page: number;
};
