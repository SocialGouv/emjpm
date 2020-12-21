import Error from "next/error";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Box, Card } from "rebass";

import { Heading4, Spinner } from "~/ui";

export const LoadingWrapper = ({
  children,
  error,
  errorCode,
  loading,
  errorRedirect,
}) => {
  const router = useRouter();

  const errorRedirectionEnabled = errorRedirect && errorRedirect.url;

  useMemo(() => {
    if (error) {
      console.error(
        "[LoadingWrapper] Unexpected error loading component:",
        error
      );
      if (errorRedirectionEnabled) {
        router.push(errorRedirect.url, errorRedirect.as, errorRedirect.options);
      }
    }
  }, [error, errorRedirect, errorRedirectionEnabled, router]);

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
};
