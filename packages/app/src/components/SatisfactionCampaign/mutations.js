import gql from "graphql-tag";

export const ADD_SATISFACTION_CAMPAIGN_ANSWER = gql`
  mutation AddSatisfactionCampaignAnswer(
    $user_id: Int!
    $satisfaction_campaign_id: Int!
    $value: Int!
  ) {
    insert_satisfaction_campaign_answers(
      objects: {
        user_id: $user_id
        satisfaction_campaign_id: $satisfaction_campaign_id
        value: $value
      }
    ) {
      affected_rows
    }
  }
`;
