import {
  noContent,
  serverError,
  success,
} from "../../domain/entities/Helpers/HttpHelper";
import HttpResponse from "../../domain/entities/Protocols/HttpResponse";
import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export default class LatestPostsUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  async execute(): Promise<HttpResponse> {
    try {
      const data = await this.repository.latestPosts();
      if (!data) if (!data) return noContent();
      return success({ message: "Latest posts", data: data });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
