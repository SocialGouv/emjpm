import gql from "graphql-tag";

const CHECK_DUPLICATE_NUMERO_RG_BY_TI_ID = gql`
  query CHECK_DUPLICATE_NUMERO_RG_BY_TI_ID($numeroRg: String!, $tiId: Int!) {
    mesures(where: { ti_id: { _eq: $tiId }, numero_rg: { _eq: $numeroRg } }) {
      id
    }
  }
`;

const CHECK_DUPLICATE_NUMERO_RG_BY_SERVICE_ID = gql`
  query CHECK_DUPLICATE_NUMERO_RG_BY_SERVICE_ID(
    $numeroRg: String!
    $serviceId: Int!
  ) {
    mesures(
      where: { service_id: { _eq: $serviceId }, numero_rg: { _eq: $numeroRg } }
    ) {
      id
    }
  }
`;

const CHECK_DUPLICATE_NUMERO_RG_BY_MANDATAIRE_ID = gql`
  query CHECK_DUPLICATE_NUMERO_RG_BY_MANDATAIRE_ID(
    $numeroRg: String!
    $mandataireId: Int!
  ) {
    mesures(
      where: {
        mandataire_id: { _eq: $mandataireId }
        numero_rg: { _eq: $numeroRg }
      }
    ) {
      id
    }
  }
`;

export async function checkDuplicateNumeroRGByTiId(client, numeroRg, tiId) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_NUMERO_RG_BY_TI_ID,
    variables: {
      numeroRg,
      tiId: parseInt(tiId),
    },
  });

  return data.mesures.length === 0;
}

export async function checkDuplicateNumeroRGByServiceId(
  client,
  numeroRg,
  serviceId
) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_NUMERO_RG_BY_SERVICE_ID,
    variables: {
      numeroRg,
      serviceId: parseInt(serviceId),
    },
  });

  return data.mesures.length === 0;
}

export async function checkDuplicateNumeroRGByMandataireId(
  client,
  numeroRg,
  mandataireId
) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_NUMERO_RG_BY_MANDATAIRE_ID,
    variables: {
      numeroRg,
      mandataireId: parseInt(mandataireId),
    },
  });

  return data.mesures.length === 0;
}
