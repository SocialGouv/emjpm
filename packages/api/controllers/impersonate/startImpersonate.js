const { User } = require("../../model/User");

const postStartImpersonate = async (req, res) => {
  const realUserId = req.user.id;
  const user_id = req.body.user_id;
  const user = await User.query()
    .findById(user_id)
    .eager("[roles, antennes, tis]");
  const impersonateUser = user.getImpersonateUser(realUserId);
  return res.status(200).json(impersonateUser);
};

module.exports = postStartImpersonate;
