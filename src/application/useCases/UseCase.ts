import HttpResponse from "../../domain/entities/Protocols/HttpResponse";

export default interface UseCase {
  execute(params: any): Promise<HttpResponse>;
}
