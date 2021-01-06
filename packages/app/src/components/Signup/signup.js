import fetch from "unfetch";

import config from "~/config";

const { API_URL } = config;

const postSignup = (body) => {
  const url = `${API_URL}/api/auth/signup`;

  const fetchParams = {
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };

  return fetch(url, fetchParams).then((res) => res.json());
};

const signup = ({ body, onSuccess, onError, onComplete }) =>
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

export default signup;
