import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export default class getDocumentByIdUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(params: Input): Promise<any> {
    try {
      return await this.repository.filterDocumentById(params.id);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
type Input = {
  id: string;
};
