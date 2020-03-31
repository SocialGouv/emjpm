import queryString from "query-string";
import fetch from "unfetch";

const API_URL = "https://api-adresse.data.gouv.fr/search";

export const geocode = async options => {
  const { q, postcode, type } = options;

  if (!q) {
    return [];
  }

  const query = queryString.stringify({ postcode, q, type });

  let response;

  try {
    response = await fetch(`${API_URL}?${query}`);
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
