import gql from "graphql-tag";

export const CURRENT_SATISFACTION_CAMPAIGN = gql`
  query CurrentSatisfactionCampaign($now: timestamptz!) {
    satisfaction_campaigns(
      where: { _and: [{ started_at: { _lt: $now } }, { ended_at: { _gt: $now } }] }
    ) {
      id
      name
      started_at
      ended_at
    }
  }
`;
