import gql from "graphql-tag";

const SERVICE_BY_SIREN = gql`
  query ServiceBySiren($siren: String!) {
    services(where: { siren: { _eq: $siren } }) {
      siren
    }
  }
`;

const findSiren = async (client, siren) => {
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
};

export default findSiren;
