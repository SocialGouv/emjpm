import gql from "graphql-tag";

const SPDF_BY_SIRET = gql`
  query SdpfBySiret($siret: String!) {
    sdpf(where: { siret: { _eq: $siret } }) {
      siret
    }
  }
`;

export default async function sdpfSiretExists(client, siret) {
  const { data } = await client.query({
    context: {
      headers: {
        "X-Hasura-Siret": siret,
      },
    },
    fetchPolicy: "network-only",
    query: SPDF_BY_SIRET,
    variables: {
      siret,
    },
  });

  return data.sdpf.length > 0;
}
