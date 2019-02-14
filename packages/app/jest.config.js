module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  verbose: true,
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/cypress"]
};
