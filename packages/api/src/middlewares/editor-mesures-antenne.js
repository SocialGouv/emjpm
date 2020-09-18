const antenneIdIsValid = require("../services/antenneIdIsValid");

const antenneIdValidator = async (req, res, next) => {
  const { body, user } = req;

  if (body.antenne_id) {
    const isValid = await antenneIdIsValid(body.antenne_id, user.id);
    if (!isValid) {
      return res.status(422).json({
        errors: [
          {
            value: body.antenne_id,
            param: "antenne_id",
            msg: `antenne_id does not match with your service.`,
          },
        ],
      });
    }
  }
  next();
};

module.exports = antenneIdValidator;
