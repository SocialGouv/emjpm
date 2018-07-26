const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

process.on("unhandledRejection", r => console.log(r));

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env.production" : "./.env"
});

module.exports = withCSS(
  withImages({
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  })
);
