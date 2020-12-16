const { User } = require("~/models/User");

const editorMesureUserMiddleWare = async (req, res, next) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: user_id },
  } = token;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
    req.user = user;
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ errors: [{ msg: "user not found", value: user_id }] });
  }

  const type = user.type === "service" ? "service" : "mandataire";
  req.type = type;

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
    req.serviceOrMandataire = serviceOrMandataire;
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: `${type} not found` }] });
  }

  next();
};

module.exports = editorMesureUserMiddleWare;
