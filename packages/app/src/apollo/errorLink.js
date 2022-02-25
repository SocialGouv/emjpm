import { onError } from "@apollo/client/link/error";
import { captureException } from "~/user/sentry";
import { logoutLocalStorage } from "~/user/Auth";
import config from "~/config";

function logout() {
  logoutLocalStorage();
  window.location.href = "/";
}

const refreshToken = () => {
  const authStorage = JSON.parse(localStorage.getItem("auth"));
  return fetch(`${config.API_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      "X-Auth-Refresh-Token": authStorage?.refreshToken || null,
    },
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path, extensions }) => {
        if (extensions.code === "invalid-jwt") {
          return refreshToken()
            .then((response) => response.json())
            .then(({ token }) => {
              const oldHeaders = operation.getContext().headers;

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: `Bearer ${token}`,
                },
              });

              console.log(token);

              return forward(operation);
            })
            .catch(() => {
              const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;

              console.error(msg);
              captureException(msg);
              logout();
            });
        }
      });
    }
    if (networkError) {
      if (networkError.statusCode === 401) {
        logout();
        return;
      }
      const msg = `[Network error]: ${networkError}`;
      console.error(msg);
      captureException(msg);
    }
  }
);

export default errorLink;
