const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? "/lebontuteur-app/" : "";

module.exports = withCSS(
  withImages({
    assetPrefix: baseUrl,
    exportPathMap: function() {
      return {
        "/": { page: "/" }
      };
    },
    webpack: config => {
      config.output.publicPath = baseUrl;
      return config;
    }
  })
);
