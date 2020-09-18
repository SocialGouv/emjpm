const getTi = require("../services/getTi");

const editorMesureTiMiddleWare = async (req, res, next) => {
  const { body } = req;

  const ti = await getTi(body.tribunal_siret);
  if (!ti) {
    return res.status(422).json({
      errors: [
        {
          param: "tribunal_siret",
          value: body.tribunal_siret,
          msg: "siret is not valid",
        },
      ],
    });
  }
  req.ti = ti;
  next();
};

module.exports = editorMesureTiMiddleWare;
