/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface PaginationRepository {
  findByAuthors(author: string, page: number): Promise<any>;
}
