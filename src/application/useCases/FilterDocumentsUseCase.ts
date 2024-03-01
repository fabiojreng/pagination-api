import PaginationRepository from "../repository/PaginationRepository";
import UseCase from "./UseCase";

export class FilterDocumentsUseCase implements UseCase {
  constructor(private repository: PaginationRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(params: Input): Promise<any> {
    try {
      // Permitir apenas types: author, date_publication, type_document, area_CNPQ

      const pag = Number(params.page);
      return await this.repository.filterDocuments(
        params.type,
        params.value,
        pag
      );
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
type Input = {
  type: string;
  value: string;
  page: number;
};
