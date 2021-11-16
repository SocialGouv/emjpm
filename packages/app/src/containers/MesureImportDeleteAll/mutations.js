import gql from "graphql-tag";

export const DELETE_ALL_MESURES = gql`
  mutation deleteAllMesures {
    delete_all_mesures {
      success
    }
  }
`;
