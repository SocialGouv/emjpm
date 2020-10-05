const { validationResult } = require("express-validator");

const mesureBatch = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
};

module.exports = mesureBatch;
