import PaginationRepository from "../repository/PaginationRepository";

export default class CountDocumentsUseCase {
  constructor(private repository: PaginationRepository) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(type: string, page: number): Promise<any> {
    try {
      // Permitir apenas types: type_document, area_CNPQ
      const pag = Number(page);
      return await this.repository.countDocuments(type, pag);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("");
    }
  }
}
