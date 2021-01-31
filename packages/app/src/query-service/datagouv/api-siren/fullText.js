import fetch from "unfetch";

const API_URL = "https://entreprise.data.gouv.fr/api/sirene/v1/full_text/";

async function fullText(search) {
  if (!search) {
    return [];
  }
  let response;
  const queryPath = encodeURIComponent(search);

  try {
    response = await fetch(`${API_URL}${queryPath}`);
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

export default fullText;
