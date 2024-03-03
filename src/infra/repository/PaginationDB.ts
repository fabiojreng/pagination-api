import PaginationRepository from "../../application/repository/PaginationRepository";
import IDatabaseConnection from "../dataBase/Connection";

export default class PaginationDB implements PaginationRepository {
  constructor(private db: IDatabaseConnection) {}

  async filterDocuments(
    type: string,
    value: string,
    page: number
  ): Promise<any> {
    await this.db.connect();
    const [qtdDocuments] = await this.db.query(
      "SELECT COUNT(*) AS quantidade FROM documents WHERE status = 'available' AND ?? LIKE ?",
      [type, `%${value}%`]
    );
    const offset = page * 5;
    const [output] = await this.db.query(
      "SELECT d.*, f.file, f.file_name, f.file_size FROM documents d LEFT JOIN files f ON d.id = f.id_document WHERE ?? LIKE ? AND status = 'available' LIMIT 5 OFFSET ?;",
      [type, `%${value}%`, offset]
    );
    await this.db.close();
    return { documents: output, qtdDocuments: qtdDocuments };
  }

  async filterDocumentById(id: string): Promise<any> {
    await this.db.connect();
    const [output] = await this.db.query(
      "SELECT d.*, f.file, f.file_name, f.file_size FROM documents d LEFT JOIN files f ON d.id = f.id_document WHERE d.id = ? AND status = 'available'",
      [id]
    );
    await this.db.close();
    return output[0];
  }

  async countDocuments(type: string): Promise<any> {
    await this.db.connect();
    const [output] = await this.db.query(
      `SELECT ${type}, COUNT(*) AS quantidade FROM documents WHERE status = 'available' GROUP BY ${type}`,
      []
    );
    await this.db.close();
    return output;
  }

  async latestPosts(): Promise<any> {
    await this.db.connect();
    const [output] = await this.db.query(
      "SELECT * FROM documents WHERE status = 'available' ORDER BY updated_at DESC LIMIT 5",
      []
    );
    await this.db.close();
    return output;
  }
}
