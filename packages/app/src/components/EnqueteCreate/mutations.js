import gql from "graphql-tag";

export const CREATE_ENQUETE = gql`
  mutation create_enquetes($year: String!) {
    insert_enquetes(objects: { status: "created", annee: $year }) {
      returning {
        id
        created_at
        status
        annee
      }
    }
  }
`;
