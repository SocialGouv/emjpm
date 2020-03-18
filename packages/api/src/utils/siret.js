const fetch = require("node-fetch");

const INSEE_API_URL = "https://api.insee.fr";
const INSEE_API_TOKEN_URL = `${INSEE_API_URL}/token`;
const INSEE_SIREN_API_URL = `${INSEE_API_URL}/entreprises/sirene/V3`;
const INSEE_API_SECRET = process.env.INSEE_API_SECRET || "";
const INSEE_API_KEY = process.env.INSEE_API_KEY || "";
const INSEE_API_BASIC_TOKEN = Buffer.from(
  `${INSEE_API_KEY}:${INSEE_API_SECRET}`
).toString("base64");

let accessToken = null;

const refreshAccessToken = async () => {
  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");

  const res = await fetch(INSEE_API_TOKEN_URL, {
    method: "post",
    headers: {
      Authorization: `Basic ${INSEE_API_BASIC_TOKEN}`
    },
    body: params
  });

  let json;

  try {
    json = await res.json();
  } catch (error) {
    return { error: error.message };
  }

  if (!res.ok) {
    return { error: json };
  }

  const { access_token } = json;

  accessToken = access_token;

  return {};
};

const checkAccessToken = async () => {
  if (!accessToken) {
    const { error } = await refreshAccessToken();
    return { error };
  }

  return {};
};

const find = async siret => {
  const { error } = await checkAccessToken();

  if (error) {
    return { error };
  }

  const res = await fetch(`${INSEE_SIREN_API_URL}/siret/${siret}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json;

  try {
    json = await res.json();
  } catch (error) {
    return { error };
  }

  if (!res.ok) {
    return { error: json };
  }

  const { etablissement } = json;

  return { data: etablissement };
};

const siret = {
  find
};

module.exports = siret;
