import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import Router from "next/router";

import { storageService } from "../../util";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// forceLogin: redirect user to /login when receiving a 401
const apiFetch = (route, params, options = { apiVersion: "v1", forceLogin: true }) => {
  const { apiVersion, forceLogin } = options;
  const apiVersionFragment = apiVersion ? `/api/${apiVersion}` : "";
  const url = `${API_URL}${apiVersionFragment}${route}`;

  const fetchParams = {
    credentials: "include",
    method: "GET",
    ...params
  };

  if (storageService.hasToken()) {
    fetchParams.headers = {
      Authorization: "Bearer " + storageService.getToken(),
      "Content-Type": "application/json"
    };
  }

  // force content-type application/json for non GET-requests
  if (fetchParams.method && fetchParams.method !== "GET" && !fetchParams.headers) {
    fetchParams.headers = {
      "Content-Type": "application/json"
    };
  }

  return fetch(url, fetchParams)
    .then(res => {
      // intercept
      if (forceLogin && res.status === 401) {
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
      return res;
    })
    .then(async res => {
      if (res.status >= 500) {
        const body = await res.json();
        const error = new Error(body.message);
        Object.assign(body, error);
        throw body;
      }
      if (res.status === 400) {
        const body = await res.json();
        const error = new Error(body.message);
        Object.assign(body, error);
        throw body;
      }
      if (res.status > 404 && res.status < 500) {
        const body = await res.json();
        const error = new Error(body.message);
        Object.assign(error, body);
        throw body;
      }
      return res;
    })
    .then(res => res.json());
};

// admin toggle
// destructuring as a whitelist
export const updateUser = ({ id, active }) =>
  apiFetch(`/admin/user/${id}`, {
    body: JSON.stringify({
      active
    }),
    method: "PUT"
  }).catch(error => {
    /* eslint-disable no-console */
    console.error(error);
    /* eslint-enable no-console */
    throw error;
  });

export default apiFetch;
