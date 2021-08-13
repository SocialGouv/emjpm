import { Router } from "react-router";
import { ThemeProvider } from "theme-ui";

import { ProvideAuth } from "~/user/Auth";

import Routes, { history } from "~/routes";
import AppApollo from "~/apollo/AppApollo";

import { GlobalStyle, theme } from "~/theme";
import { useSentry, captureException } from "~/user/sentry";

import AppUser from "~/user/AppUser";
import AppMatomo from "~/user/AppMatomo";

import { ErrorBoundary, AutoReload, GlobalLoader } from "~/components";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ReactTooltip from "react-tooltip";

export default function App() {
  useSentry();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ErrorBoundary onError={captureException}>
          <GlobalLoader>
            <ProvideAuth>
              <AppApollo>
                <AppUser>
                  <ReactTooltip className={"react-tooltip"} />
                  <Router history={history}>
                    <AppMatomo>
                      <Routes />
                    </AppMatomo>
                  </Router>
                </AppUser>
              </AppApollo>
            </ProvideAuth>
          </GlobalLoader>
        </ErrorBoundary>
      </ThemeProvider>
      <ToastContainer />
      <AutoReload />
    </>
  );
}
