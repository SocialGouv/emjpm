import { css, Global } from "@emotion/core";
import * as Sentry from "@sentry/react";
import jwtDecode from "jwt-decode";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "theme-ui";
import { UserProvider } from "~/components/UserContext/index";
import { ProvideAuth, useAuth } from "~/routes/Auth";

import Routes, { history } from "~/routes";
import { useInitApolloClient } from "~/lib/apollo";

import { GlobalStyle, presetEmjpm } from "~/ui";
import { formatUserFromToken } from "~/util/formatUserFromToken";
import { useSentry } from "~/util/sentry";
import { Router } from "react-router-dom";

import { useMatomo } from "~/util/matomo";

function App() {
  useSentry();

  return (
    <>
      <GlobalStyle />
      <Global
        styles={css`
          body,
          html,
          div#__next {
            font-size: 14px;
            font-family: "Open Sans", sans-serif;
            background: #f2f5f9;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />

      <ThemeProvider theme={presetEmjpm}>
        <Sentry.ErrorBoundary fallback={"Une erreur s'est produite"}>
          <ProvideAuth>
            <AppApollo />
          </ProvideAuth>
        </Sentry.ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

function AppApollo() {
  const { authStore } = useAuth();
  const { token } = authStore;

  const apolloClient = useInitApolloClient({}, token);

  const currentUser = token ? jwtDecode(token) : null;
  // const data = { currentUser: formatUserFromToken(currentUser) };
  const user = formatUserFromToken(currentUser);

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider user={user}>
        <Router history={history}>
          <AppMatomo>
            <Routes />
          </AppMatomo>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

function AppMatomo({ children }) {
  useMatomo();
  return <>{children}</>;
}

export default App;
