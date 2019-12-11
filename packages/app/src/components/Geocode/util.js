import queryString from "query-string";
import fetch from "unfetch";

const API_URL = "https://api-adresse.data.gouv.fr/search";
const API_FILTER_TYPE = "municipality";

export const geocode = async q => {
  const query = queryString.stringify({ q });

  let response;

  try {
    response = await fetch(`${API_URL}?${query}`);
  } catch (error) {
    return { error: error.message };
  }

  if (!response.ok) {
    return { error: response.statusText };
  }

  let geojson;

  try {
    geojson = await response.json();
  } catch (e) {
    return { error: e.toString() };
  }

  const results = geojson.features
    .map(({ geometry, properties }) => {
      const { city, postcode, type } = properties;

      if (type !== API_FILTER_TYPE) {
        return;
      }

      const { coordinates } = geometry;
      const [lng, lat] = coordinates;

      return { city, postcode, lat, lng };
    })
    .filter(Boolean);

  return { error: null, results };
};
