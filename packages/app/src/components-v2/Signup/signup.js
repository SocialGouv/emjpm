import fetch from "isomorphic-fetch";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const postSignup = body => {
  const url = `${API_URL}/api/v2/auth/signup`;

  const fetchParams = {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  };

  return fetch(url, fetchParams).then(res => res.json());
};

export default ({ body, onSuccess, onError, onComplete }) =>
  postSignup(body)
    .then(res => {
      if (res.success) {
        onSuccess();
      } else {
        onError(res.errors.map(error => error.msg));
      }
    })
    .catch(error => {
      onError([error.message]);
    })
    .finally(() => {
      onComplete();
    });
