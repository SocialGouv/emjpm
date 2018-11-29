const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withTM = require("next-plugin-transpile-modules");

process.on("unhandledRejection", r => console.log(r));

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env.production" : "./.env"
});

module.exports = withTM(withCSS(
  withImages({
    transpileModules: ["color","strict-uri-encode","decode-uri-component","query-string"],
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  })
));
