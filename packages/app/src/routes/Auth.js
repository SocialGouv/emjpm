import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { LoadingWrapper } from "~/components/Commons";

// see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

import { matopush } from "~/util/matomo";
import config from "~/config";
import history from "~/routes/history";

const { API_URL } = config;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  const syncLogout = useCallback(
    (event) => {
      if (event.key === "logout") {
        const { authStore } = auth;
        if (authStore.logged) {
          console.log("logged out from storage!");
          auth.logout();
        }
      }
    },
    [auth]
  );
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

const authInitialState = {
  logged: localStorage.getItem("logged"),
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  type: localStorage.getItem("type"),
};

function authReducer(state, { type, payload }) {
  switch (type) {
    case "logout": {
      return {
        ...state,
        id: null,
        logged: false,
        token: null,
        type: null,
      };
    }
    case "login": {
      const { id, type, token } = payload;
      return { ...state, id, logged: true, token, type };
    }
    case "loaded": {
      return { ...state };
    }
    default:
      throw new Error("unknown auth action '" + type + "'");
  }
}

export function useProvideAuth() {
  const [authStore, dispatchAuthStore] = useReducer(
    authReducer,
    authInitialState
  );

  const logout = useCallback(() => {
    // to support logging out from all windows
    localStorage.setItem("logout", Date.now());

    // clear user data
    localStorage.removeItem("logged");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("type");
    localStorage.removeItem("filters");

    dispatchAuthStore({ type: "logout" });
  }, [dispatchAuthStore]);

  const login = useCallback(
    ({ token, id, type }) => {
      localStorage.setItem("logged", "1");
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("type", type);

      matopush(["trackEvent", "login", "success"]);
      matopush(["setUserId", type + "-" + id]);
      matopush(["trackPageView"]);

      dispatchAuthStore({
        payload: {
          id,
          token,
          type,
        },
        type: "login",
      });
    },
    [dispatchAuthStore]
  );

  // login redirect
  const prevLoggedStateRef = useRef(() => authStore.logged);
  useEffect(() => {
    const { pathname } = window.location;
    if (!authStore.logged && pathname === "/") {
      history.push("/login");
    }
    if (authStore.logged && prevLoggedStateRef.current !== authStore.logged) {
      const isOauth = pathname === "/application/authorization";
      if (!isOauth) {
        const { url, role } = jwtDecode(authStore.token);
        if (!url) {
          logout();
        }
        if (pathname === "/" || pathname === "/login") {
          history.push(routeByRole[role]);
        }
      }
    }
  }, [authStore, logout]);

  return {
    authStore,
    login,
    logout,
  };
}

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
