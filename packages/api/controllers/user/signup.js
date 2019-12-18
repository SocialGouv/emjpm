const { validationResult } = require("express-validator");
const { User } = require("../../model/User");
const { Mandataire } = require("../../model/Mandataire");
const { Magistrat } = require("../../model/Magistrat");
const { UserTis } = require("../../model/UserTis");
const { UserRole } = require("../../model/UserRole");
const { Role } = require("../../model/Role");
const { Direction } = require("../../model/Direction");
const { errorHandler } = require("../../db/errors");
const { inscriptionEmail } = require("../../email/inscription");
const { getTisNames } = require("./utils/tis");
const {
  getServiceAntennesByService,
  createUserAntenne,
  createServiceAdmin
} = require("./utils/service");

const createMagistrat = async (magistrat, user) => {
  const { ti } = magistrat;
  if (!ti) {
    throw new Error(
      "Renseigner un tribunal est obligatoire pour un compte 'magistrat'"
    );
  }
  return Magistrat.query()
    .allowInsert("[user_id, ti_id]")
    .insert({
      user_id: user.id,
      ti_id: ti
    });
};

const createMandataire = async (mandataire, user_id) => {
  const {
    etablissement,
    telephone,
    telephone_portable,
    adresse,
    code_postal,
    department_id,
    ville,
    dispo_max,
    siret,
    latitude,
    longitude
  } = mandataire;

  return Mandataire.query()
    .allowInsert(
      "[etablissement,siret, telephone,user_id,telephone_portable,adresse,code_postal,ville, department_id, dispo_max]"
    )
    .insert({
      user_id,
      siret,
      etablissement,
      telephone,
      telephone_portable,
      adresse,
      code_postal,
      department_id,
      ville,
      dispo_max,
      latitude,
      longitude
    });
};

const createUserTis = (tis, user_id) => {
  if (!tis || tis.length === 0) {
    return true;
  }
  Promise.all(
    tis.map(ti_id =>
      UserTis.query()
        .allowInsert("[user_id, ti_id]")
        .insert({
          user_id,
          ti_id
        })
    )
  );
};

const createDirection = userId => {
  return Direction.query().insert({
    user_id: userId
  });
};

const createRole = async (userId, type) => {
  const [role] = await Role.query().where("name", type);
  if (role && userId) {
    return UserRole.query()
      .allowInsert("[user_id,role_id]")
      .insert({
        user_id: userId,
        role_id: role.id
      });
  }
};

/**
 * POST /signup
 * Create a new local account
 */

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const body = req.body;

    const { type, nom, prenom, password, username, email } = body.user;

    const user = await User.query()
      .allowInsert("[username, password,role,nom,prenom,email]")
      .insert({
        username,
        password,
        type,
        nom,
        prenom,
        email: email.toLowerCase().trim()
      });
    await createRole(user.id, type);
    switch (type) {
      case "individuel":
      case "prepose":
        await createMandataire(body.mandataire, user.id);
        await createUserTis(body.tis, user.id);
        break;
      case "service": {
        const { service_id } = body.service;
        const antennes = await getServiceAntennesByService(service_id);
        await createUserAntenne(user.id, antennes);
        await createServiceAdmin(user.id, service_id);
        break;
      }
      case "ti": {
        const { cabinet } = body.magistrat;
        await User.query()
          .update({ cabinet })
          .where("id", user.id);
        await createMagistrat(body.magistrat, user);
        break;
      }
      case "direction": {
        const { directionType } = body.direction;
        await createRole(user.id, directionType);
        await createDirection(user.id);
        break;
      }
      default:
        return;
    }
    const tis = body.magistrat ? [body.magistrat.ti] : body.tis;
    const code_postal = body.mandataire ? body.mandataire.code_postal : "";
    const tiNames = await getTisNames(tis);
    inscriptionEmail(nom, prenom, email, code_postal, type, tiNames);
    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

module.exports = signup;
