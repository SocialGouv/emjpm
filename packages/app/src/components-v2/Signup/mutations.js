import gql from "graphql-tag";

export const ADD_MANDATAIRE = gql`
  mutation insert_mandataires($objects: [mandataires_insert_input!]!) {
    insert_mandataires(objects: $objects) {
      affected_rows
    }
  }
`;
