export default interface IDatabaseConnection {
  connect(): Promise<void>;
  close(): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query(statement: string, params: any): Promise<any>;
}
