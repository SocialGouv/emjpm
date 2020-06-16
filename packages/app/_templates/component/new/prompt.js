const promptArgs = require("./promptArgUtil");

const questions = [
  {
    message: `what is the name of your component:`,
    name: "name",
    type: "input",
  },
];

module.exports = {
  prompt: promptArgs(questions),
};
