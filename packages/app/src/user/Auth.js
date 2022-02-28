import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import { Redirect, Route } from "react-router-dom";
// see https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/
import jwtDecode from "jwt-decode";

import fetch from "unfetch";

import { matopush } from "~/user/matomo";
import config from "~/config";
import history from "~/routes/history";
import creds from "~/user/creds";

const { API_URL } = config;

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  const syncLogout = useCallback(
    (event) => {
      if (event.key === "logout") {
        const { authStore } = auth;
        if (authStore.id) {
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
  greffier: "/greffiers",
};

const getAuthInitialState = () => {
  const storage =
    localStorage.getItem("impersonate") || localStorage.getItem("auth");
  const state = storage ? JSON.parse(storage) : {};
  return state;
};

const authInitialState = getAuthInitialState();

creds.token = authInitialState.token;
creds.refreshToken = authInitialState.refreshToken;

function authReducer(state, { type, payload }) {
  switch (type) {
    case "logout": {
      return {
        ...state,
        id: null,
        type: null,
        isImpersonated: false,
      };
    }
    case "login": {
      const { id, type } = payload;
      return { ...state, id, type };
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
    logoutLocalStorage();
    creds.refreshToken = null;
    creds.token = null;
    dispatchAuthStore({ type: "logout" });
  }, [dispatchAuthStore]);

  const renewToken = useCallback((newToken) => {
    creds.token = newToken;
  }, []);

  const login = useCallback(
    ({ token, id, type, refreshToken }) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          id,
          token,
          refreshToken,
          type,
        })
      );

      matopush(["trackEvent", "login", "success"]);
      matopush(["setUserId", type + "-" + id]);
      matopush(["trackPageView"]);

      creds.token = token;
      creds.refreshToken = refreshToken;
      dispatchAuthStore({
        payload: {
          id,
          type,
        },
        type: "login",
      });
    },
    [dispatchAuthStore]
  );

  // login redirect
  const prevLoggedStateRef = useRef(() => authStore.id);
  useEffect(() => {
    const { pathname } = window.location;
    if (!authStore.id && pathname === "/") {
      history.push("/login");
    }

    if (authStore.id && prevLoggedStateRef.current !== authStore.id) {
      const isOauth = pathname === "/application/authorization";
      if (!isOauth) {
        const { url, role } = jwtDecode(creds.token);
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
    renewToken,
  };
}

export function PrivateRoute({ children, ...rest }) {
  const { authStore } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStore.id ? (
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

export async function impersonateLogin(impersonateParams) {
  const url = `${API_URL}/api/auth/impersonate`;
  const response = await fetch(url, {
    body: JSON.stringify({
      token: impersonateParams.token,
      id: impersonateParams.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const json = await response.json();
  const { id, token, type } = json;
  localStorage.setItem(
    "impersonate",
    JSON.stringify({ id, token, type, isImpersonated: true })
  );
  localStorage.removeItem("filters");
  window.location.href = "/";
}

export function impersonateLogout() {
  localStorage.removeItem("impersonate");
  localStorage.removeItem("filters");
  window.location.href = "/";
}

export function logoutLocalStorage() {
  localStorage.removeItem("auth");
  localStorage.removeItem("impersonate");

  // to support logging out from all windows
  localStorage.setItem("logout", Date.now());

  // clear user data
  localStorage.removeItem("filters");
}

export function AuthRedirect(props) {
  const auth = useAuth();
  useEffect(() => {
    const { authStore } = auth;
    if (authStore.id) {
      const { role } = jwtDecode(creds.token);
      history.push(routeByRole[role]);
      return null;
    }
    history.push("/login");
  }, [auth]);
  return null;
}

export function clearUserStorage() {
  localStorage.removeItem("auth");
  localStorage.removeItem("impersonate");
  localStorage.removeItem("filters");
}
