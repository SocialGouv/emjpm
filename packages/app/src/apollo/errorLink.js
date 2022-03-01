import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { captureException } from "~/user/sentry";
import { logoutLocalStorage } from "~/user/Auth";
import config from "~/config";

import creds from "~/user/creds";

function logout() {
  logoutLocalStorage();
  window.location.href = "/";
}

const refreshToken = () => {
  return fetch(`${config.API_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      "X-Auth-Refresh-Token": creds.refreshToken,
    },
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      let isInvalidJWT;
      let ErrorMessage;
      for (const { extensions, message } of graphQLErrors) {
        if (extensions.code === "invalid-jwt") {
          isInvalidJWT = true;
          ErrorMessage = message;
          break;
        }
      }
      if (isInvalidJWT) {
        const tokenRefreshPromise = refreshToken()
          .then((response) => response.json())
          .then(({ token, refresh_token }) => {
            const oldHeaders = operation.getContext().headers;

            operation.setContext({
              headers: {
                ...oldHeaders,
                Authorization: `Bearer ${token}`,
              },
            });
            creds.token = token;
            creds.refreshToken = refresh_token;
            return forward(operation);
          })
          .catch((error) => {
            const msg = `[GraphQL error]: Message: ${ErrorMessage}`;
            console.error(msg);
            console.error(error);
            captureException(msg);
            logout();
          });

        return fromPromise(tokenRefreshPromise).flatMap(() => {
          return forward(operation);
        });
      }
    }
    if (networkError) {
      console.log(networkError);
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
