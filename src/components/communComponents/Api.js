import Router from "next/router";
import fetch from "isomorphic-fetch";

const API_URL = process.env.API_URL;

const apiFetch = (route, params) =>
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
      if (res.status === 401) {
        Router.push("/login");
        return;
      }
      return res;
    })
    .then(res => res.json());

export default apiFetch;
