import gql from "graphql-tag";

export const SATISFACTION_CAMPAIGNS = gql`
  query satisfactionCampaigns($limit: Int, $searchText: String, $offset: Int) {
    satisfaction_campaigns(
      limit: $limit
      order_by: { id: desc }
      offset: $offset
      where: { name: { _ilike: $searchText } }
    ) {
      id
      name
      started_at
      ended_at
      answers: satisfaction_campaign_answers_aggregate {
        aggregate {
          count
          avg {
            value
          }
        }
      }
    }
  }
`;

export const SATISFACTION_CAMPAIGN = gql`
  query satisfactionCampaign($id: Int, $limit: Int, $offset: Int) {
    satisfaction_campaigns(
      where: { id: { _eq: $id } }
      limit: $limit
      offset: $offset
    ) {
      id
      name
      started_at
      ended_at
      answers: satisfaction_campaign_answers_aggregate {
        aggregate {
          count
          avg {
            value
          }
        }
      }
    }
  }
`;
