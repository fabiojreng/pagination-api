import IDatabaseConnection from "./Connection";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export default class AdapterMySQL implements IDatabaseConnection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection: any;
  constructor() {}

  async connect(): Promise<void> {
    try {
      this.connection = mysql.createPool({
        //connectionLimit: 10,
        host: process.env.MYSQL_HOST,
        port: Number(process.env.PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Não foi possível conectar");
    }
  }

  async close(): Promise<void> {
    await this.connection.end();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query(statement: string, params: any): Promise<any> {
    try {
      return await this.connection.query(statement, params);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Erro ao executar a query");
    }
  }
}
