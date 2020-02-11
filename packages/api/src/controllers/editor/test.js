const test = async (req, res) => {
  return res.status(200).json({ test: "test" });
};

module.exports = test;
