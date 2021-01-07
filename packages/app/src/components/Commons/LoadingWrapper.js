import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card } from "rebass";

import Error from "~/components/Error";
import { Heading4, Spinner } from "~/ui";

export function LoadingWrapper({
  children,
  error,
  errorCode,
  loading,
  errorRedirect,
}) {
  const history = useHistory();

  const errorRedirectionEnabled = errorRedirect && errorRedirect.url;

  useMemo(() => {
    if (error) {
      console.error(
        "[LoadingWrapper] Unexpected error loading component:",
        error
      );
      if (errorRedirectionEnabled) {
        history.push(errorRedirect.url);
      }
    }
  }, [error, errorRedirect, errorRedirectionEnabled, history]);

  return errorCode ? (
    <Error code={errorCode} />
  ) : error ? (
    errorRedirectionEnabled ? (
      <Card mt={4} height="100%">
        <Heading4>Erreur inattendue, redirection...</Heading4>
        <Box mt="3">
          <Spinner />
        </Box>
      </Card>
    ) : (
      <Card mt={4} height="100%">
        <Heading4>Erreur inattendue</Heading4>
      </Card>
    )
  ) : loading ? (
    <Card mt={4} height="100%">
      <Heading4>Chargement en cours..</Heading4>
      <Box mt="3">
        <Spinner />
      </Box>
    </Card>
  ) : (
    <div>{children}</div>
  );
}
