import queryString from "query-string";
import fetch from "unfetch";

const API_URL = "https://api-adresse.data.gouv.fr/search";

export const geocode = async options => {
  const { query, postcode, type } = options;

  if (!query) {
    return [];
  }

  const queryParameters = queryString.stringify({ postcode, q: query, type });

  let response;

  try {
    response = await fetch(`${API_URL}?${queryParameters}`);
  } catch (error) {
    return [];
  }

  if (!response.ok) {
    return [];
  }

  let geojson;

  try {
    geojson = await response.json();
  } catch (e) {
    return [];
  }

  return geojson.features.map(({ geometry, properties }) => {
    const { city, postcode, label, context } = properties;
    const { coordinates } = geometry;
    const [longitude, latitude] = coordinates;
    const [depcode] = context.split(", ");

    return {
      city,
      depcode,
      label,
      latitude,
      longitude,
      postcode
    };
  });
};
