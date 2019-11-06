const { User } = require("../../model/User");

const postStopImpersonate = async (req, res) => {
  const realUserId = req.user.realUserId;
  const user_id = req.body.user_id;
  const user = await User.query()
    .findById(user_id)
    .eager("[roles, antennes, tis]");
  return res.status(200).json(user.getImpersonateUser(realUserId));
};

module.exports = postStopImpersonate;
