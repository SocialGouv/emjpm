const { validationResult } = require("express-validator");
const { User } = require("../../model/User");
const { Mandataire } = require("../../model/Mandataire");
const { Service } = require("../../model/Service");
const { UserTi } = require("../../model/UserTi");
const { errorHandler } = require("../../db/errors");

/**
 * POST /signup
 * Create a new local account
 */
const postSignup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  try {
    const user = await User.query()
      .allowInsert("[username, password,role,nom,prenom,email]")
      .insert({
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
        // cabinet: req.body.role === "ti" ? req.body.cabinet : null,
        // service_id: service ? service.id : null
      });

    const { type } = req.body;

    // const service =
    //   req.body.role === "service" &&
    //   (await Service.query()
    //     .allowInsert(
    //       "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
    //     )
    //     .insert({
    //       etablissement: req.body.etablissement,
    //       nom: req.body.nom,
    //       prenom: req.body.prenom,
    //       email: req.body.email,
    //       telephone: req.body.telephone,
    //       adresse: req.body.adresse,
    //       code_postal: req.body.code_postal,
    //       ville: req.body.ville,
    //       dispo_max: req.body.dispo_max
    //     }));

    // req.body.role === "individue" ||
    //   (req.body.role === "prepose" &&
    //     (await Mandataire.query()
    //       .allowInsert(
    //         "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
    //       )
    //       .insert({
    //         user_id: user.id,
    //         etablissement: req.body.etablissement,
    //         telephone: req.body.telephone,
    //         telephone_portable: req.body.telephone_portable,
    //         adresse: req.body.adresse,
    //         code_postal: req.body.code_postal,
    //         ville: req.body.ville
    //       })));

    // await Promise.all(
    //   req.body.tis.map(ti_id =>
    //     UserTi.query()
    //       .allowInsert(
    //         "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
    //       )
    //       .insert({
    //         user_id: user.id,
    //         ti_id
    //       })
    //   )
    // );

    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

module.exports = postSignup;
