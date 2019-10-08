import { gql } from "apollo-server-koa";

export default gql`
  input MesureImportData {
    date_ouverture: String!
    type: String!
    code_postal: String!
    ville: String!
    civilite: String!
    annee: String!
    numero_rg: String!
    numero_dossier: String
    residence: String!
  }

  type Mutation {
    importMesures(
      content: [MesureImportData!]!
      file_name: String!
      file_size: Int!
      file_type: String!
    ): Int!
  }
`;
