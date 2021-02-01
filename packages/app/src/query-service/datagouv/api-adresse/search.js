import fetch from "unfetch";
import queryString from "query-string";

// https://geo.api.gouv.fr/adresse

const API_URL = "https://api-adresse.data.gouv.fr/search/";

async function searchAdresse(search) {
  let data = {};
  if (!search) {
    return data;
  }
  let response;
  const queryParameters = queryString.stringify({ q: search });

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
