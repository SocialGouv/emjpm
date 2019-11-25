import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import nextCookie from "next-cookies";
import Router from "next/router";
import React, { Component } from "react";

const clearToken = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  window.localStorage.removeItem("id_token");
  window.localStorage.removeItem("login");
};

export const logout = () => {
  clearToken();
  Router.push("/error", "/login");
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || "Component";

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const routes = {
  admin: "/admin",
  direction: "/direction",
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats"
};

export const auth = ctx => {
  const { token } = nextCookie(ctx);
  const { pathname } = ctx;
  const isLogin =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/inscription" ||
    pathname === "/";

  if (token) {
    const { url, role } = jwtDecode(token);
    const isTokenPath = pathname.indexOf(routes[role]) !== -1;
    if (!url) {
      clearToken();
      if (ctx.req) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
      } else {
        Router.push("/login", "/login");
      }
    } else if (!isTokenPath) {
      if (ctx.req) {
        ctx.res.writeHead(302, { Location: routes[role] });
        ctx.res.end();
      } else {
        Router.push(routes[role], routes[role]);
      }
    }
  }

  if (!token) {
    if (!isLogin) {
      if (ctx.req) {
        ctx.res.writeHead(302, { Location: "/login" });
        ctx.res.end();
      } else {
        Router.push("/login", "/login");
      }
    }
  }

  return token;
};
