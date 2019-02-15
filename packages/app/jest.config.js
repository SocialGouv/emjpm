module.exports = {
  verbose: true,
  collectCoverageFrom: ["src/**/*.js"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/cypress"]
};
