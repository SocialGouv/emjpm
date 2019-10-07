import { gql } from "apollo-server-koa";

export default gql`
  type Mutation {

    importMesure(mesuresImport: MesuresImport!)

  }

  type MesuresImport {
    content: jsonb!
    file_name: String!
    file_size: Int!
    file_type: String!
  }
`;
