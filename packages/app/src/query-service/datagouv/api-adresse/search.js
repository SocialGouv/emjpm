import fetch from "unfetch";
import queryString from "query-string";

// https://geo.api.gouv.fr/adresse

const API_URL = "https://api-adresse.data.gouv.fr/search/";

async function searchAdresse(search) {
  if (!search) {
    return [];
  }
  let response;
  const queryParameters = queryString.stringify({ q: search });

  try {
    response = await fetch(`${API_URL}?${queryParameters}`);
  } catch (error) {
    return [];
  }

  if (!response.ok) {
    return [];
  }

  let data;

  try {
    data = await response.json();
  } catch (e) {
    return [];
  }
  return data;
}

export default searchAdresse;
