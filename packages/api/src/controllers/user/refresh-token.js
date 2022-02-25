const User = require("~/models/User");

const refreshToken = async (req, res) => {
  try {
    const receivedRereshToken = req.header("X-Auth-Refresh-Token");

    if (receivedRereshToken) {
      // find user by refresh_token
      const foundedUser = await User.query()
        .withGraphFetched("[roles, service, direction, mandataire]")
        .findOne({
          refresh_token: receivedRereshToken,
        });
      if (!foundedUser || !foundedUser.active) {
        throw new Error("Utilisateur introuvable");
      }

      const isRefreshTokenValid = await foundedUser.verifyRefreshToken();
      if (isRefreshTokenValid) {
        const newAccessToken = await foundedUser.getJwt();

        return res.status(200).send({
          token: newAccessToken,
        });
      }
    } else {
      throw new Error("Une erreur s'est produite");
    }
  } catch (error) {
    throw new Error("Une erreur s'est produite");
  }
};

module.exports = refreshToken;
