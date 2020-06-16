import gql from "graphql-tag";

const CHECK_SIRET_UNICITY = gql`
  query MANDATAIRE_SIRET($siret: String!) {
    mandataires(where: { siret: { _eq: $siret } }) {
      siret
    }
  }
`;

export const isSiretExists = async (client, siret) => {
  const checkSiret = await client.query({
    context: {
      headers: {
        "X-Hasura-Siret": siret,
      },
    },
    fetchPolicy: "network-only",
    query: CHECK_SIRET_UNICITY,
    variables: {
      siret,
    },
  });
  return checkSiret.data.mandataires.length > 0;
};
