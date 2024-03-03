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
    // const [qtdDocuments] = await this.db.query(
    //   "SELECT COUNT(*) AS quantidade FROM documents WHERE status = 'available'",
    //   []
    // );
    // console.log(qtdDocuments);
    const query =
      "SELECT d.*, f.file, f.file_name, f.file_size FROM documents d LEFT JOIN files f ON d.id = f.id_document WHERE ?? LIKE ? AND status = 'available' LIMIT 5 OFFSET ?;";
    const offset = page * 5;
    const [output] = await this.db.query(query, [type, `%${value}%`, offset]);
    await this.db.close();
    return output;
  }

  async filterDocumentById(id: string): Promise<any> {
    await this.db.connect();
    const [output] = await this.db.query(
      "SELECT * FROM documents WHERE id = ? AND status = 'available'",
      [id]
    );
    await this.db.close();
    return output;
  }

  async countDocuments(type: string): Promise<any> {
    await this.db.connect();
    const query = `SELECT ${type}, COUNT(*) AS quantidade FROM documents WHERE status = 'available' GROUP BY ${type}`;
    const [output] = await this.db.query(query, []);
    await this.db.close();
    return output;
  }

  async latestPosts(): Promise<any> {
    await this.db.connect();
    const query =
      "SELECT * FROM documents WHERE status = 'available' ORDER BY updated_at DESC LIMIT 5";
    const [output] = await this.db.query(query, []);
    await this.db.close();
    return output;
  }
}
