module.exports = (api) => {
  api.cache(true);

  return {
    plugins: ["@babel/plugin-transform-runtime"],
    presets: ["@babel/preset-env"],
  };
};
