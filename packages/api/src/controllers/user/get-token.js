const getToken = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.status(200).json({
      token,
    });
  } else {
    res.status(401).json({
      errors: {
        error: "token cookie not found",
        location: "body",
      },
    });
  }
  return;
};

module.exports = getToken;
