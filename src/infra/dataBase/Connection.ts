export default interface IDatabaseConnection {
  connect(): Promise<void>;
  close(): Promise<void>;
  query(statement: string, params: any): Promise<any>;
}
