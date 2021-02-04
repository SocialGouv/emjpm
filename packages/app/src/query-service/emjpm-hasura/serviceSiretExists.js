import gql from "graphql-tag";

const SERVICE_BY_SIREN = gql`
  query ServiceBySiren($siren: String!) {
    services(where: { siren: { _eq: $siren } }) {
      siren
    }
  }
`;

export default async function serviceSiretExists(client, siren) {
  const { data } = await client.query({
    context: {
      headers: {
        "X-Hasura-Siret": siren,
      },
    },
    fetchPolicy: "network-only",
    query: SERVICE_BY_SIREN,
    variables: {
      siren,
    },
  });

  return data.services.length > 0;
}
