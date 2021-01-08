import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useRef,
  useReducer,
} from "react";
import { Redirect, Route } from "react-router-dom";
import cookie from "js-cookie";
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
        console.log("logged out from storage!");
        auth.logout();
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
  id: null,
  loading: cookie.get("logged") === "1",
  logged: false,
  token: null,
  type: null,
};

function authReducer(state, { type, payload }) {
  switch (type) {
    case "logout": {
      return {
        ...state,
        id: null,
        loading: false,
        logged: false,
        token: null,
        type: null,
      };
    }
    case "login": {
      const { id, type, token } = payload;
      return { ...state, id, loading: false, logged: true, token, type };
    }
    case "loaded": {
      return { ...state, loading: false };
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
    cookie.remove("logged");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    localStorage.removeItem("filters");

    dispatchAuthStore({ type: "logout" });
  }, [dispatchAuthStore]);

  const login = useCallback(
    ({ token, id, type }) => {
      cookie.set("logged", "1");

      localStorage.setItem("user_id", id);
      localStorage.setItem("user_type", type);

      matopush(["trackEvent", "login", "success"]);
      matopush(["setUserId", authStore.id]);
      if (authStore.type) {
        matopush(["setCustomVariable", 1, "type", authStore.type, "visit"]);
      }

      dispatchAuthStore({
        payload: {
          id,
          token,
          type,
        },
        type: "login",
      });
    },
    [authStore, dispatchAuthStore]
  );

  // login redirect
  const prevLoggedStateRef = useRef(() => authStore.logged);
  useEffect(() => {
    if (authStore.logged && prevLoggedStateRef.current !== authStore.logged) {
      const { pathname } = window.location;
      const isOauth = pathname === "/application/authorization";
      if (!isOauth) {
        const { url, role } = jwtDecode(authStore.token);
        if (!url) {
          logout();
        }
        const isTokenPath = pathname.indexOf(routeByRole[role]) !== -1;
        if (!isTokenPath) {
          history.push(routeByRole[role]);
        }
      }
    }
  }, [authStore, logout]);

  // load token in memory
  useEffect(() => {
    (async () => {
      if (cookie.get("logged")) {
        const response = await fetch(`${API_URL}/api/auth/get-token`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const { token } = await response.json();
        if (token) {
          dispatchAuthStore({
            payload: {
              id: localStorage.getItem("user_id"),
              token,
              type: localStorage.getItem("user_type"),
            },
            type: "login",
          });
        } else {
          dispatchAuthStore({ type: "logout" });
        }
      }
    })();
  }, [dispatchAuthStore]);

  return {
    authStore,
    login,
    logout,
  };
}

export function PrivateRoute({ children, ...rest }) {
  const { authStore } = useAuth();
  return (
    <LoadingWrapper loading={authStore.loading}>
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
    </LoadingWrapper>
  );
}
