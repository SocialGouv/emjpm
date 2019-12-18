import pDebounce from "p-debounce";
import queryString from "query-string";
import fetch from "unfetch";

const API_URL = "https://api-adresse.data.gouv.fr/search";

export const geocode = async q => {
  if (!q) {
    return [];
  }

  const query = queryString.stringify({ q });

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
    const [lng, lat] = coordinates;
    const [depcodeString] = context.split(", ");
    const depcode = parseInt(depcodeString);

    return {
      label,
      value: {
        city,
        depcode,
        label,
        lat,
        lng,
        postcode
      }
    };
  });
};

export const debouncedGeocode = pDebounce(geocode, 500);
