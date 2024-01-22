/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface PaginationRepository {
  filterDocuments(type: string, value: string, page: number): Promise<any>;
}
