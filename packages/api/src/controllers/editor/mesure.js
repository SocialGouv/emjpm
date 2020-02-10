const mesure = async (req, res) => {
  console.log(req);
  return res.status(200).json({ test: "test" });
};

module.exports = mesure;
