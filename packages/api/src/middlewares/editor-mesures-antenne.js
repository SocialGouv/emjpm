const antenneIdIsValid = require("../services/antenneIdIsValid");

const antenneIdValidator = async (req, res, next) => {
  const { body, user } = req;

  if (body.antenne_id) {
    const isValid = await antenneIdIsValid(body.antenne_id, user.id);
    if (!isValid) {
      return res.status(422).json({
        errors: [
          {
            msg: `antenne_id does not match with your service.`,
            param: "antenne_id",
            value: body.antenne_id,
          },
        ],
      });
    }
  }
  next();
};

module.exports = antenneIdValidator;
