async function checkEnqueteMandataireParameters(req, res) {
  const { enqueteId, mandataireId } = req.body.input;
  if (!enqueteId || !mandataireId) {
    res.status(422).json({
      message: "Invalid parameters: enqueteId or mandataireId is required"
    });
  }
}

module.exports = { checkEnqueteMandataireParameters };
