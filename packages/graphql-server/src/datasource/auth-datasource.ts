import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { configuration } from "../config";

export class AuthDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = configuration.HASURA_GRAPHQL_URI;
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", this.context.token);
  }
}
