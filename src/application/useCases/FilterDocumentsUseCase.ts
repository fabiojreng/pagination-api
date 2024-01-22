import PaginationRepository from "../repository/PaginationRepository";

export class FilterDocumentsUseCase {
  constructor(private repository: PaginationRepository) {}

  execute(type: string, value: string, page: number): Promise<void> {
    const pag = Number(page);
    return this.repository.filterDocuments(type, value, pag);
  }
}
