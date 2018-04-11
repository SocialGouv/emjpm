const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env.production" : "./.env"
});

const exportPathMap = () => ({
  "/index.html": { page: "/" },
  "/login.html": { page: "/login" },
  "/tis.html": { page: "/tis" }
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
