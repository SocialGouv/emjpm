import gql from "graphql-tag";

import { getRegionCode } from "../util/departements";

const DEPARTEMENT_BY_CP = gql`
  query DEPARTEMENT_BY_CP($code: String!) {
    departements(where: { code: { _eq: $code } }) {
      code
      id
      id_region
      nom
    }
  }
`;

export const getDepartementByCodePostal = async (client, codePostal) => {
  if (!codePostal) {
    return null;
  }
  const code = getRegionCode(codePostal);
  const res = await client.query({
    query: DEPARTEMENT_BY_CP,
    variables: {
      code
    }
  });
  const departements = res.data.departements;
  return departements.length ? departements[0] : null;
};
