import fetch from "unfetch";
import queryString from "query-string";

// https://nominatim.org/release-docs/develop/api/Search/

const API_URL = " https://nominatim.openstreetmap.org/search";

async function searchAdresse(search, format = "json") {
  let data = {};
  if (!search) {
    return data;
  }
  let response;
  const queryParameters = queryString.stringify({
    q: search,
    format,
    countrycodes: ["fr"],
  });

  try {
    response = await fetch(`${API_URL}?${queryParameters}`);
  } catch (error) {}

  try {
    const result = await response.json();
    data = result;
  } catch (e) {}

  return data;
}

export default searchAdresse;
