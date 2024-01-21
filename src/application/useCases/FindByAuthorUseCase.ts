import PaginationRepository from "../repository/PaginationRepository";

export class FindByAuthorUseCase {
  constructor(private repository: PaginationRepository) {}

  async execute(name: string, page: number): Promise<void> {
    const pag = Number(page);
    return this.repository.findByAuthors(name, pag);
  }
}
