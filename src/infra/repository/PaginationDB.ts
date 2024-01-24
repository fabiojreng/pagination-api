/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationRepository from "../../application/repository/PaginationRepository";
import IDatabaseConnection from "../dataBase/Connection";

export default class PaginationDB implements PaginationRepository {
  constructor(private db: IDatabaseConnection) {}
  async filterDocuments(
    type: string,
    value: string,
    page: number
  ): Promise<any> {
    try {
      await this.db.connect();
      const query =
        "SELECT * FROM docs WHERE ?? LIKE ? AND status = 'available' LIMIT 5 OFFSET ?";
      const offset = page * 5;
      const [output] = await this.db.query(query, [type, `%${value}%`, offset]);
      return output;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.db.close();
    }
  }
  async filterDocumentById(id: string): Promise<any> {
    try {
      await this.db.connect();
      const [output] = await this.db.query(
        "SELECT * FROM docs WHERE id = ? AND status = 'available'",
        [id]
      );
      return output;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.db.close();
    }
  }
}
