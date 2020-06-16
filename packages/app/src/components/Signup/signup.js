import getConfig from "next/config";
import fetch from "unfetch";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const postSignup = (body) => {
  const url = `${API_URL}/api/auth/signup`;

  const fetchParams = {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };

  return fetch(url, fetchParams).then((res) => res.json());
};

export default ({ body, onSuccess, onError, onComplete }) =>
  postSignup(body)
    .then((res) => {
      if (res.success) {
        onSuccess();
      } else {
        onError(res.errors.map((error) => error.msg));
      }

      onComplete();
    })
    .catch((error) => {
      onError([error.message]);
      onComplete();
    });
