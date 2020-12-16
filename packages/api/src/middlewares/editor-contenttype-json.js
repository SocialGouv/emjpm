const contentTypeValidator = async (req, res, next) => {
  if (!req.is("application/json")) {
    // Send error here
    res.status(400).json({
      errors: [
        {
          msg: `The content-type must be 'application/json'`,
        },
      ],
    });
  }
  next();
};

module.exports = contentTypeValidator;
