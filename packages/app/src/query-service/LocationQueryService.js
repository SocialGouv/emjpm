import gql from "graphql-tag";

import { getRegionCode } from "../util/departements";
import { geocode } from "../util/geocode";

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

export const getLocation = async (client, { address, zipcode, city }) => {
  try {
    let geolocation = null;

    // 1. If address parameter is specified we try to find the location via geocode api

    if (address) {
      const geocodeResults = await geocode({ postcode: zipcode, q: `${address}, ${city}` });
      if (geocodeResults.length) {
        const [{ latitude, longitude }] = geocodeResults;
        geolocation = { latitude, longitude };
      }
    }

    // 2. We get the associated department id

    const code = getRegionCode(zipcode);
    const { data } = await client.query({
      query: LOCATIONS,
      variables: { code, zipcode },
    });

    // 3. If address parameter is not specified we get "geolocalisation_code_postal" rows and try to match via city name

    const { geolocalisation_code_postal: geolocations, departements: departments } = data;
    if (geolocation === null && geolocations.length) {
      geolocation = geolocations.find(({ cities }) => cities.includes(city.toUpperCase().trim()));
      if (!geolocation) {
        const [{ latitude, longitude }] = geolocations;
        geolocation = {
          latitude,
          longitude,
        };
      }
    }

    return {
      department: departments.length ? departments[0] : null,
      geolocation,
    };
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
