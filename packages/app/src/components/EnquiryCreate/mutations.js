import gql from "graphql-tag";

export const CREATE_ENQUIRY = gql`
  mutation create_enquiry($year: String!) {
    insert_enquiries(objects: { status: "created", year: $year }) {
      returning {
        id
        status
        year
        created_at
      }
    }
  }
`;
