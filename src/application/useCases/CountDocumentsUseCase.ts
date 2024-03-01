import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export default class CountDocumentsUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(params: Input): Promise<any> {
    try {
      // Permitir apenas types: type_document, area_CNPQ
      const pag = Number(params.page);
      return await this.repository.countDocuments(params.type, pag);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
type Input = {
  type: string;
  page: number;
};
