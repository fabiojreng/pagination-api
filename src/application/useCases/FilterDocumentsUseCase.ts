import PaginationRepository from "../repository/PaginationRepository";

export class FilterDocumentsUseCase {
  constructor(private repository: PaginationRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(type: string, value: string, page: number): Promise<any> {
    try {
      // Permitir apenas types: author, date_publication, type_document, area_CNPQ

      const pag = Number(page);
      return await this.repository.filterDocuments(type, value, pag);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
