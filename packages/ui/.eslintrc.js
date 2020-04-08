const error = 2;
const ignore = 0;
const warn = 1;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings', 'prettier', 'prettier/react'],
  plugins: ['sort-keys-fix', 'simple-import-sort', 'prettier', 'import', 'jest', 'jsx-a11y', 'react', 'json', 'html'],
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    'react/jsx-props-no-spreading': [ignore],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'simple-import-sort/sort': error,
    'sort-keys-fix/sort-keys-fix': [error, 'asc'],
    'react/jsx-fragments': [error, 'element'],
    'import/prefer-default-export': ignore,
    'import/no-extraneous-dependencies': [error, { devDependencies: ['rollup.config.js', '**/*.stories.js'] }],
  },
};
