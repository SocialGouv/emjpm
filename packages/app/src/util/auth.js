import cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import nextCookie from "next-cookies";
import Router from "next/router";
import React, { Component } from "react";

const clearToken = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.removeItem("token");
};

export const logout = () => {
  clearToken();
  Router.push("/login", "/login");
};

export const login = async ({ token }) => {
  cookie.set("token", token, { expires: 1 });
  localStorage.setItem("token", token);
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component) => Component.displayName || Component.name || "Component";

export const withAuthSync = (WrappedComponent) =>
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
  ti: "/magistrats",
};

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);
  const { pathname } = ctx;
  const isPublic =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/signup/invitation" ||
    pathname === "/inscription" ||
    pathname === "/" ||
    pathname === "/account/reset-password" ||
    pathname === "/account/forgot-password" ||
    pathname === "/application/authorization" ||
    pathname === "/application/token-request";

  const isOauth = pathname === "/application/authorization";

  if (token) {
    const { url, role } = jwtDecode(token);
    const isTokenPath = pathname.indexOf(routes[role]) !== -1;
    if (isOauth) {
      return token;
    } else if (!url) {
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
    if (!isPublic) {
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
