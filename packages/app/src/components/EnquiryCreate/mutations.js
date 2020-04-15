import gql from "graphql-tag";

export const CREATE_ENQUIRY = gql`
  mutation create_enquetes($year: String!) {
    insert_enquetes(objects: { status: "created", annee: $annee }) {
      returning {
        id
        created_at
        status
        annee
      }
    }
  }
`;
