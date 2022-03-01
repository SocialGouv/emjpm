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
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }

      const validRefreshToken = await foundedUser.isRefreshTokenValid();
      const { isValid, expiresSoon } = validRefreshToken;
      if (expiresSoon) {
        const newRefreshToken = await foundedUser.generateRefreshToken();
        await User.query().findById(foundedUser.id).update({
          refresh_token: newRefreshToken,
        });
        const newAccessToken = await foundedUser.getJwt();
        return res.status(200).send({
          refresh_token: newRefreshToken,
          token: newAccessToken,
        });
      }
      if (isValid) {
        const newAccessToken = await foundedUser.getJwt();

        return res.status(200).send({
          refreshToken: receivedRereshToken,
          token: newAccessToken,
        });
      }
    } else {
      return res.status(500).send({
        error: "Une erreur s'est produite",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur s'est produite",
    });
  }
};

module.exports = refreshToken;
