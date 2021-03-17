import { onError } from "@apollo/client/link/error";
import { captureException } from "~/user/sentry";
import { logoutLocalStorage } from "~/user/Auth";

function logout() {
  logoutLocalStorage();
  window.location.href = "/";
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      if (extensions.code === "invalid-jwt") {
        logout();
        return;
      }
      const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      console.error(msg);
      captureException(msg);
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
});

export default errorLink;
