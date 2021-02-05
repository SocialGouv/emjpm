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
import { LoadingWrapper } from "~/containers/Commons";

import fetch from "unfetch";

import { matopush } from "~/user/matomo";
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
        if (authStore.token) {
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

const getAuthInitialState = () => {
  let storage;
  storage = localStorage.getItem("impersonate");
  if (!storage) {
    storage = localStorage.getItem("auth");
  }
  const state = JSON.parse(storage) || {};
  return state;
};

const authInitialState = getAuthInitialState();

function authReducer(state, { type, payload }) {
  switch (type) {
    case "logout": {
      return {
        ...state,
        id: null,
        token: null,
        type: null,
        isImpersonated: false,
      };
    }
    case "login": {
      const { id, type, token } = payload;
      return { ...state, id, token, type };
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
    localStorage.setItem("auth", JSON.stringify({}));
    localStorage.removeItem("impersonate");

    // to support logging out from all windows
    localStorage.setItem("logout", Date.now());

    // clear user data
    localStorage.removeItem("filters");

    dispatchAuthStore({ type: "logout" });
  }, [dispatchAuthStore]);

  const login = useCallback(
    ({ token, id, type }) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token,
          id,
          type,
        })
      );

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
  const prevLoggedStateRef = useRef(() => authStore.token);
  useEffect(() => {
    const { pathname } = window.location;
    if (!authStore.token && pathname === "/") {
      history.push("/login");
    }
    if (authStore.token && prevLoggedStateRef.current !== authStore.token) {
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
        authStore.token ? (
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
  window.location.href = "/";
}

export async function impersonateLogout() {
  localStorage.removeItem("impersonate");
  window.location.href = "/";
}

export function AuthRedirect(props) {
  const { authStore, logout } = useAuth();
  const { url, role } = jwtDecode(authStore.token);
  if (!url) {
    history.push("/login");
  } else {
    history.push(routeByRole[role]);
  }
  return null;
}
