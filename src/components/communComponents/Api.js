import Router from "next/router";
import fetch from "isomorphic-fetch";

const API_URL = process.env.API_URL;

const apiFetch = (route, params, options = { forceLogin: true }) =>
  fetch(`${API_URL}/api/v1${route}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    ...params
  })
    .then(res => {
      // intercept
      if (options.forceLogin && res.status === 401) {
        Router.push("/login");
        return;
      }
      if (res.status === 404) {
        throw new Error(404);
      }
      return res;
    })
    .then(res => res.json());

// admin toggle
// destructuration as a whitelist
export const updateUser = ({ id, active }) =>
  apiFetch(`/admin/user/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      active: active
    })
  }).catch(e => {
    console.log(e);
    throw e;
  });

export default apiFetch;
