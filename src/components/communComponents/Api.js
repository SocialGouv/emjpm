import Router from "next/router";
import fetch from "isomorphic-fetch";

const API_URL = process.env.API_URL || "http://127.0.0.1:4000";

// forceLogin: redirect user to /login when receiving a 401
const apiFetch = (route, params, options = { forceLogin: true }) => {
  const getToken = () => {
    return localStorage.getItem("id_token");
  };

  // const isTokenExpired = token => {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) {
  //       // Checking if token is expired. N
  //       return true;
  //     } else return false;
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const loggedIn = () => {
    const token = getToken();
    return !!token;
  };

  const fetchParams = {
    method: "GET",
    credentials: "include",
    ...params
  };

  if (loggedIn()) {
    fetchParams.headers = {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json"
    };
  }

  // force content-type application/json for non GET-requests
  if (fetchParams.method && fetchParams.method !== "GET" && !fetchParams.headers) {
    fetchParams.headers = {
      "Content-Type": "application/json"
    };
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
