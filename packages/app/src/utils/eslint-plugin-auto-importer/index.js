/* eslint-disable */
"use strict";

const requireIndex = require("requireindex");
const autoImportRule = require("./auto-import");

module.exports = {
  rules: {
    "auto-import": autoImportRule.create,
  },
};
