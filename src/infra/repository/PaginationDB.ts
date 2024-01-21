/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationRepository from "../../application/repository/PaginationRepository";
import IDatabaseConnection from "../dataBase/Connection";

export default class PaginationDB implements PaginationRepository {
  constructor(private db: IDatabaseConnection) {}
  async findByAuthors(author: string, page: number): Promise<any> {
    try {
      await this.db.connect();
      const query =
        "SELECT * FROM repository.docs WHERE author LIKE ? LIMIT 5 OFFSET ?";
      const offset = page * 5;
      const output = await this.db.query(query, [`%${author}%`, offset]);
      return output[0];
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.db.close();
    }
  }
}
