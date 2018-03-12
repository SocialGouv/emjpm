const isProduction = (process.env.NODE_ENV === 'production')
const baseUrl = isProduction ? "/lebontuteur-app/" : "";

const withCSS = require("@zeit/next-css");
module.exports = withCSS({
    assetPrefix: baseUrl,
    exportPathMap: function() {
        return {
     "/": { page: "/" }
    };
},
    webpack: config => {
        config.output.publicPath = `${baseUrl}${config.output.publicPath}`;
        return config;
    }
});