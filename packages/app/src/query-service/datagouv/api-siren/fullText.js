import fetch from "unfetch";

const API_URL = "https://entreprise.data.gouv.fr/api/sirene/v1/full_text/";

async function fullText(search) {
  let data = {};

  if (!search) {
    return data;
  }

  let response;
  const queryPath = encodeURIComponent(search);

  try {
    response = await fetch(`${API_URL}${queryPath}`);
  } catch (error) {}

  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  return data;
}

export default fullText;
