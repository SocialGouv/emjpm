const promptArgs = require('./promptArgUtil');

const questions = [
  {
    message: `what is the name of your component:`,
    name: 'name',
    type: 'input',
  },
  {
    message: `Where should i create this components (core or components):`,
    name: 'package',
    type: 'input',
  },
];

module.exports = {
  prompt: promptArgs(questions),
};
