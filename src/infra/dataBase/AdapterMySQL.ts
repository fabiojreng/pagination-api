import IDatabaseConnection from "./Connection";
import mysql from "mysql2/promise";

export default class AdapterMySQL implements IDatabaseConnection {
  connection: any;
  constructor() {}

  async connect(): Promise<void> {
    this.connection = mysql.createPool({
      //connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      port: Number(process.env.PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  async close(): Promise<void> {
    await this.connection.end();
  }
  async query(statement: string, params: any): Promise<any> {
    return await this.connection.query(statement, params);
  }
}
