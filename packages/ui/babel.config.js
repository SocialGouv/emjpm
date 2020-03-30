module.exports = (api) => {
  api.cache(true);

  return {
    env: {
      test: {
        plugins: ['require-context-hook']
      }
    },
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
    ],
    presets: ['@babel/env', '@babel/react']
  };
};
