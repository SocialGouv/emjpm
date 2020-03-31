import gql from "graphql-tag";

import { getRegionCode } from "../util/departements";

export const LOCATIONS = gql`
  query locations($zipcode: String!, $code: String!) {
    geolocalisation_code_postal(where: { code_postal: { _eq: $zipcode } }) {
      code_postal
      latitude
      longitude
      cities
    }
    departements(where: { code: { _eq: $code } }) {
      id
      id_region
      nom
      code
    }
  }
`;

export const getLocation = async (client, { zipcode, city }) => {
  try {
    const code = getRegionCode(zipcode);
    const {
      data: { geolocalisation_code_postal: geolocations, departements: departments }
    } = await client.query({
      query: LOCATIONS,
      variables: { code, zipcode }
    });

    let geolocation = null;
    if (geolocations) {
      geolocation = geolocations.find(({ ville }) => ville === city.toUpperCase().trim());
      if (!geolocation) {
        geolocation = geolocations[0];
      }
    }

    return {
      department: departments.length ? departments[0] : null,
      geolocation
    };
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
