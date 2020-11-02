import gql from "graphql-tag";

export const CURRENT_SATISFACTION_CAMPAIGN = gql`
  query CurrentSatisfactionCampaign($now: timestamptz!, $user_id: Int!) {
    satisfaction_campaigns(
      where: {
        _and: [{ started_at: { _lt: $now } }, { ended_at: { _gt: $now } }]
      }
    ) {
      id
      name
      started_at
      ended_at
      answers: satisfaction_campaign_answers(
        where: { user_id: { _eq: $user_id } }
      ) {
        id
      }
    }
  }
`;
