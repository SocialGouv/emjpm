import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { configuration } from "../config";

export class AuthDataSource extends RESTDataSource {
  public readonly adminHeader: {};

  constructor() {
    super();
    this.baseURL = configuration.HASURA_GRAPHQL_URI;
    this.adminHeader = {
      "X-Hasura-Admin-Secret":
        configuration.HASURA_GRAPHQL_ADMIN_SECRET || "secret"
    };
  }

  protected willSendRequest(request: RequestOptions) {
    if (!request.headers.get("X-Hasura-Admin-Secret")) {
      request.headers.set("Authorization", this.context.token);
    }
  }
}
