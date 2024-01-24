import PaginationRepository from "../repository/PaginationRepository";

export default class getDocumentByIdUseCase {
  constructor(private repository: PaginationRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(id: string): Promise<any> {
    try {
      return await this.repository.filterDocumentById(id);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
