import gql from "graphql-tag";

const SERVICE_BY_SIRET = gql`
  query ServiceBySiret($siret: String!) {
    services(where: { siret: { _eq: $siret } }) {
      siret
    }
  }
`;

export default async (client, siret) => {
  const { data } = await client.query({
    context: {
      headers: {
        "X-Hasura-Siret": siret
      }
    },
    fetchPolicy: "network-only",
    query: SERVICE_BY_SIRET,
    variables: {
      siret
    }
  });

  return data.services.length > 0;
};
