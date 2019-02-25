import Router from "next/router";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// forceLogin: redirect user to /login when receiving a 401
const apiFetch = (route, params, options = { forceLogin: true }) => {
  const getToken = () => {
    return localStorage.getItem("id_token");
  };

  const hasToken = () => {
    const token = getToken();
    return !!token;
  };

  const fetchParams = {
    method: "GET",
    credentials: "include",
    ...params
  };

  const isUpload = route === "/mandataires/upload";

  if (hasToken()) {
    fetchParams.headers = {
      Authorization: "Bearer " + getToken(),
      ...(fetchParams.headers || {})
    };
    if (!isUpload) {
      fetchParams.headers["Content-Type"] = "application/json";
    }
  }

  return fetch(`${API_URL}/api/v1${route}`, fetchParams)
    .then(res => {
      // intercept
      if (options.forceLogin && res.status === 401) {
        console.log(`401 on ${route}`);
        Router.push("/login");
      }
      if (res.status === 404) {
        console.log(`404 on ${route}`);
        throw new Error(404);
      }
      if (res.status >= 500) {
        console.log(`${res.status} on ${route}`);
        throw new Error(res.status);
      }
      return res;
    })
    .then(res => res && res.json());
};

// admin toggle
// destructuring as a whitelist
export const updateUser = ({ id, active }) =>
  apiFetch(`/admin/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      active
    })
  }).catch(e => {
    console.log(e);
    throw e;
  });

export default apiFetch;
