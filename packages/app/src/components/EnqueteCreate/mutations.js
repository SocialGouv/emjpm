import gql from "graphql-tag";

export const CREATE_ENQUETE = gql`
  mutation create_enquetes($year: String!, $endedAt: timestamptz!) {
    insert_enquetes(
      objects: { status: "created", annee: $year, date_fin: $endedAt }
    ) {
      returning {
        id
        created_at
        status
        annee
        date_fin
      }
    }
  }
`;
