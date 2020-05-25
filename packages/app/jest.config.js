module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: process.env.JEST_COVERAGE_DIRECTORY,
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/cypress"]
};
