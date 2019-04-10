import Router from "next/router";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

const { publicRuntimeConfig: { API_URL } } = getConfig();

// forceLogin: redirect user to /login when receiving a 401
const apiFetch = (route, params, options = { forceLogin: true }) => {
  const getToken = () => {
    return localStorage.getItem("id_token");
  };


  const isUpload = route === "/mandataires/upload";

  const hasToken = () => {
    const token = getToken();
    return !!token;
  };


  const fetchParams = {
    method: "GET",
    credentials: "include",
    ...params
  };



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
        /* eslint-disable no-console */
        console.log(`401 on ${route}`);
        /* eslint-enable no-console */
        Router.push("/login");
      }
      if (res.status === 404) {
        /* eslint-disable no-console */
        console.log(`404 on ${route}`);
        /* eslint-enable no-console */
        throw new Error(404);
      }
      if (res.status >= 500) {
        /* eslint-disable no-console */
        console.log(`${res.status} on ${route}`);
        /* eslint-enable no-console */
        throw new Error(res.status);
      }
      return res;
    })
    .then(async res => {
      if (res.status > 404 && res.status < 500) {
        const body = await res.json();
        const error = new Error(body.message);
        Object.assign(error, body);
        throw error;
      }
      return res;
    })
    .then(res => res.json());
};

// admin toggle
// destructuring as a whitelist
export const updateUser = ({ id, active }) =>
  apiFetch(`/admin/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      active
    })
  }).catch(error => {
    /* eslint-disable no-console */
    console.error(error);
    /* eslint-enable no-console */
    throw error;
  });

export default apiFetch;
