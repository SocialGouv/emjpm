import { onError } from "@apollo/client/link/error";
import { captureException } from "~/user/sentry";
import { logoutLocalStorage } from "~/user/Auth";
import config from "~/config";

function logout() {
  logoutLocalStorage();
  window.location.href = "/";
}

const refreshToken = (authStore) => {
  return fetch(`${config.API_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      "X-Auth-Refresh-Token": authStore?.refreshToken,
    },
  });
};

export default (authStore, renewToken) => {
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          if (extensions.code === "invalid-jwt") {
            return refreshToken(authStore)
              .then((response) => response.json())
              .then(({ token }) => {
                const oldHeaders = operation.getContext().headers;

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: `Bearer ${token}`,
                  },
                });
                renewToken(token);
              })
              .catch((error) => {
                const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;

                console.error(msg);
                console.error(error);
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
  return errorLink;
};
