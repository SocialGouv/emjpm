import gql from "graphql-tag";

const CHECK_DUPLICATE_MANDATAIRE_SIRET_FROM_MANDATAIRE = gql`
  query CHECK_DUPLICATE_MANDATAIRE_SIRET_FROM_MANDATAIRE($siret: String!) {
    view_mandataires_siret(where: { siret: { _eq: $siret } }) {
      siret
    }
  }
`;

const CHECK_DUPLICATE_LISTE_BLANCHE_SIRET = gql`
  query CHECK_DUPLICATE_LISTE_BLANCHE_SIRET($siret: String!) {
    liste_blanche(where: { siret: { _eq: $siret } }) {
      id
    }
  }
`;

const CHECK_DUPLICATE_SERVICE_SIRET = gql`
  query CHECK_DUPLICATE_SERVICE_SIRET($siret: String!) {
    services(where: { siret: { _eq: $siret } }) {
      id
    }
  }
`;

export async function checkDuplicateListeBlancheSIRET(client, siret) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_LISTE_BLANCHE_SIRET,
    variables: {
      siret,
    },
  });
  return data.liste_blanche.length === 0;
}

export async function checkDuplicateMandataireSIRET(client, siret) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_MANDATAIRE_SIRET_FROM_MANDATAIRE,
    variables: {
      siret,
    },
  });
  return data.view_mandataires_siret.length === 0;
}

export async function checkDuplicateServiceSIRET(client, siret) {
  const { data } = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_DUPLICATE_SERVICE_SIRET,
    variables: {
      siret,
    },
  });
  return data.services.length === 0;
}
