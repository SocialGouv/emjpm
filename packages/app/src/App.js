import { Global, css } from "@emotion/react";
import { Router } from "react-router";
import { ThemeProvider } from "theme-ui";

import { ProvideAuth } from "~/user/Auth";

import Routes, { history } from "~/routes";
import AppApollo from "~/apollo/AppApollo";

import { GlobalStyle, presetEmjpm } from "~/theme";
import { useSentry, captureException } from "~/user/sentry";

import AppUser from "~/user/AppUser";
import AppMatomo from "~/user/AppMatomo";

import { ErrorBoundary, AutoReload } from "~/components";

import Impersonation from "~/containers/Impersonation";

export default function App() {
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
        <ErrorBoundary onError={captureException}>
          <ProvideAuth>
            <AppApollo>
              <AppUser>
                <Router history={history}>
                  <AppMatomo>
                    <Routes />
                  </AppMatomo>
                </Router>
              </AppUser>
            </AppApollo>
            <Impersonation />
          </ProvideAuth>
        </ErrorBoundary>
      </ThemeProvider>
      <AutoReload />
    </>
  );
}
