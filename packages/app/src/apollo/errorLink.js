import { onError } from "@apollo/client/link/error";
import { captureException } from "~/user/sentry";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      const msg = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      console.error(msg);
      captureException(msg);
    });
  }
  if (networkError) {
    const msg = `[Network error]: ${networkError}`;
    console.error(msg);
    captureException(msg);
  }
});

export default errorLink;
