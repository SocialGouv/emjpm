const { validationResult } = require("express-validator");
const { User } = require("../../model/User");
const { Mandataire } = require("../../model/Mandataire");
const { Service } = require("../../model/Service");
const { UserTi } = require("../../model/UserTi");
const { UserRole } = require("../../model/UserRole");
const { Role } = require("../../model/Role");
const { errorHandler } = require("../../db/errors");

/**
 * POST /signup
 * Create a new local account
 */

const insertMandataire = (body, user) =>
  Mandataire.query()
    .allowInsert(
      "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
    )
    .insert({
      user_id: user.id,
      etablissement: body.etablissement,
      telephone: body.telephone,
      telephone_portable: body.telephone_portable,
      adresse: body.adresse,
      code_postal: body.code_postal,
      ville: body.ville
    });

const insertService = body =>
  Service.query()
    .allowInsert(
      "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
    )
    .insert({
      etablissement: body.etablissement,
      nom: body.nom,
      prenom: body.prenom,
      email: body.email,
      telephone: body.telephone,
      adresse: body.adresse,
      code_postal: body.code_postal,
      ville: body.ville,
      dispo_max: body.dispo_max
    });

const updateUserService = (service, user) =>
  User.query()
    .update({ service_id: service.id })
    .where("id", user.id);

const insertUserTis = (body, user) =>
  Promise.all(
    body.tis.map(ti_id =>
      UserTi.query()
        .allowInsert("[user_id, ti_id]")
        .insert({
          user_id: user.id,
          ti_id
        })
    )
  );
const postSignup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  try {
    const { type, cabinet, username, password, nom, prenom, email } = req.body;

    const user = await User.query()
      .allowInsert("[username, password,role,nom,prenom,email]")
      .insert({
        username,
        password,
        type,
        nom,
        prenom,
        email
      });

    const [role] = await Role.query().where("name", type);

    await UserRole.query()
      .allowInsert("[user_id,role_id]")
      .insert({
        user_id: user.id,
        role_id: role.id
      });

    switch (type) {
      case "individuel":
      case "preprose":
        await insertMandataire(req.body, user);
        await insertUserTis(req.body, user);
        break;
      case "service": {
        const service = await insertService(req.body);
        await updateUserService(service, user);
        break;
      }
      case "ti":
        await User.query()
          .update({ cabinet })
          .where("id", user.id);
        await insertUserTis(req.body, user);
        break;
      default:
        return;
    }

    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

module.exports = postSignup;
