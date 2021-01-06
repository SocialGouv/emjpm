import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Redirect, Route } from "react-router-dom";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";

// import config from "~/config";
import { matopush } from "~/util/matomo";

import history from "~/routes/history";

// const { API_URL } = config;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      console.log("logged out from storage!");
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [syncLogout]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

const routeByRole = {
  admin: "/admin",
  direction: "/direction",
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats",
};

export function useProvideAuth() {
  const [authStore, setAuthStore] = useState({
    id: null,
    logged: false,
    token: null,
    type: null,
  });

  const logout = useCallback(() => {
    setAuthStore({
      id: null,
      logged: false,
      token: null,
      type: null,
    });
  }, [setAuthStore]);

  const login = useCallback(
    async ({ token, id, type }) => {
      setAuthStore({
        id,
        logged: true,
        token,
        type,
      });
    },
    [setAuthStore]
  );

  useEffect(() => {
    if (authStore.logged) {
      cookie.set("logged", "1");
      localStorage.setItem("user_id", authStore.id);
      localStorage.setItem("user_type", authStore.type);

      matopush(["trackEvent", "login", "success"]);
      matopush(["setUserId", authStore.id]);
      if (authStore.type) {
        matopush(["setCustomVariable", 1, "type", authStore.type, "visit"]);
      }

      const { pathname } = window.location;
      const isOauth = pathname === "/application/authorization";
      const { url, role } = jwtDecode(authStore.token);
      const isTokenPath = pathname.indexOf(routeByRole[role]) !== -1;
      if (!isOauth) {
        if (!url) {
          logout();
        }
        if (!isTokenPath) {
          history.push(routeByRole[role]);
        }
      }
    } else {
      // to support logging out from all windows
      localStorage.setItem("logout", Date.now());

      // clear user data
      cookie.remove("logged");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");

      // Clear user preferences & filters
      localStorage.removeItem("filters");

      history.push("/login", "/login");
    }
  }, [authStore, logout]);

  return {
    authStore,
    login,
    logout,
  };
}

// see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
  const { authStore } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStore.logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
