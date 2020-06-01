async function checkEnqueteIndividuelParameters(req, res) {
  const { enqueteId, mandataireId } = req.body.input;
  if (!enqueteId || !mandataireId) {
    res.status(422).json({
      message: "Invalid parameters: enqueteId or mandataireId is required"
    });
  }
}

async function checkEnqueteIndividuelSubmitParameters(req, res) {
  const { id } = req.body.input;
  if (!id) {
    res.status(422).json({
      message: "Invalid parameters: id is required"
    });
  }
}

module.exports = {
  checkEnqueteIndividuelParameters,
  checkEnqueteIndividuelSubmitParameters
};
