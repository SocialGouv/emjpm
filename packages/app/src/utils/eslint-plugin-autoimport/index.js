/* eslint-disable */
"use strict";

const requireIndex = require("requireindex");
const autoImportRule = require("./autoimport");

module.exports = {
  rules: {
    "autoimport": autoImportRule.create,
  },
};
