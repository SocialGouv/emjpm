const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env.production" : "./.env"
});

const exportPathMap = () => ({
  "/": { page: "/" },
  "/login": { page: "/login" },
  "/admin": { page: "/admin" },
  "/tis": { page: "/tis" },
  "/services": { page: "/services" },
  "/inscription": { page: "/inscription" },
  "/mandataires": { page: "/mandataires" }
});

module.exports = withCSS(
  withImages({
    exportPathMap,
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  })
);
