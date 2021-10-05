import gql from "graphql-tag";

const CHECK_DUPLICATE_NUMERO_RG_BY_TI_ID = gql`
  query CHECK_DUPLICATE_NUMERO_RG_BY_TI_ID($numeroRg: String!, $tiId: Int!) {
    mesures(where: { ti_id: { _eq: $tiId }, numero_rg: { _eq: $numeroRg } }) {
      id
    }
  }
`;

export default async function checkDuplicateNumeroRG(client, numeroRg, tiId) {
  console.log(tiId);
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
