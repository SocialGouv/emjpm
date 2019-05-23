module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: process.env.JEST_COVERAGE_DIRECTORY,
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/cypress"]
};
