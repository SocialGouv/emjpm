import gql from "graphql-tag";

export const ADD_SATISFACTION_CAMPAIGN = gql`
  mutation addSatisfactionCampaign(
    $name: String!
    $started_at: timestamptz!
    $ended_at: timestamptz!
  ) {
    insert_satisfaction_campaigns(
      objects: { name: $name, started_at: $started_at, ended_at: $ended_at }
    ) {
      returning {
        name
        started_at
        ended_at
      }
    }
  }
`;

export const REMOVE_SATISFACTION_CAMPAIGN = gql`
  mutation removeSatisfactionCampaign($id: Int) {
    delete_satisfaction_campaigns(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
