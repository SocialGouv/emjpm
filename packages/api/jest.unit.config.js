module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/src/"],
};
