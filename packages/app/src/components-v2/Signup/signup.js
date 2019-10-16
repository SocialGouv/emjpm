import fetch from "isomorphic-fetch";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

export default body => {
  console.log(body);
  const url = `${API_URL}/api/v2/auth/signup`;

  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  return fetch(url, fetchParams);
};
