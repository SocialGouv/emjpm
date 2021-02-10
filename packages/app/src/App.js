import { Router } from "react-router";
import { ThemeProvider } from "theme-ui";

import { ProvideAuth } from "~/user/Auth";

import Routes, { history } from "~/routes";
import AppApollo from "~/apollo/AppApollo";

import { GlobalStyle, presetEmjpm } from "~/theme";
import { useSentry, captureException } from "~/user/sentry";

import AppUser from "~/user/AppUser";
import AppMatomo from "~/user/AppMatomo";

import { ErrorBoundary, AutoReload, GlobalLoader } from "~/components";

import Impersonation from "~/containers/Impersonation";

export default function App() {
  useSentry();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={presetEmjpm}>
        <ErrorBoundary onError={captureException}>
          <GlobalLoader>
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
          </GlobalLoader>
        </ErrorBoundary>
      </ThemeProvider>
      <AutoReload />
    </>
  );
}
