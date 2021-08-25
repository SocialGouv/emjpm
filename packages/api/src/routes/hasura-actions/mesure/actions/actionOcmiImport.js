const updateMandataireMesuresFromOCMI = require("~/services/updateMandataireMesuresFromOCMI");

module.exports = async (req, res) => {
  const { userId } = req.user;

  let errors = [];
  try {
    const result = await updateMandataireMesuresFromOCMI({
      manual: true,
      userId,
    });
    if (result === false) {
      throw new Error("ocmi mandataire not found");
    }
    errors = result.errors;
  } catch (error) {
    return res.status(422).json({
      code: error.code,
      message: error.message,
    });
  }

  // success
  return res.json({
    errors,
  });
};
