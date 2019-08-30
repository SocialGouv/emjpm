const { validationResult } = require("express-validator");
const { User } = require("../../model/User");
const { Mandataire } = require("../../model/Mandataire");
const { UserTis } = require("../../model/UserTis");
const { UserRole } = require("../../model/UserRole");
const { Role } = require("../../model/Role");
const { Direction } = require("../../model/Direction");
const { errorHandler } = require("../../db/errors");
const { inscriptionEmail } = require("../../email/inscription");
const { getTisNames } = require("./utils/tis");
const {
  createService,
  createServiceAntenne,
  createServiceAntenneTis,
  createUserAntenne,
  createServiceAdmin
} = require("./utils/service");

const createMandataire = (body, user) =>
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

const createUserTis = (body, user_id) => {
  const { tis } = body;
  if (!tis || tis.length === 0) {
    return true;
  }
  Promise.all(
    tis.map(ti_id =>
      UserTis.query()
        .allowInsert("[user_id, ti_id]")
        .insert({
          user_id: user_id,
          ti_id
        })
    )
  );
};

const createDirection = (body, userId) => {
  Direction.query().insert({
    user_id: userId,
    department_id:
      body.directionType === "direction_departemental"
        ? body.department_id
        : null,
    region_id:
      body.directionType === "direction_regional" ? body.region_id : null
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

const updateUserService = (service, user) =>
  User.query()
    .update({ service_id: service.id })
    .where("id", user.id);

/**
 * POST /signup
 * Create a new local account
 */

const postSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      password,
      directionType,
      username,
      type,
      nom,
      prenom,
      email,
      code_postal,
      tis,
      cabinet
    } = req.body;
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
    await createRole(user.id, type);
    switch (type) {
      case "individuel":
      case "preprose":
        await createMandataire(req.body, user);
        await createUserTis(req.body, user.id);
        break;
      case "service": {
        const service = await createService(req.body);
        const serviceAntenne = await createServiceAntenne(req.body, service.id);
        await createUserAntenne(user.id, [{ id: serviceAntenne.id }]);
        await createServiceAdmin(user.id, service.id);
        await createServiceAntenneTis(req.body, serviceAntenne.id);
        await updateUserService(service, user);
        break;
      }
      case "serviceAntenne": {
        await createUserAntenne(user.id, req.body.antennes);
        await updateUserService(req.body.serviceId, user);
        break;
      }
      case "ti":
        await User.query()
          .update({ cabinet })
          .where("id", user.id);
        await createUserTis(req.body, user.id);
        break;
      case "direction": {
        await createRole(user.id, directionType);
        await createDirection(req.body, user.id);
        break;
      }
      default:
        return;
    }
    const tiNames = await getTisNames(tis);
    await inscriptionEmail(nom, prenom, email, code_postal, type, tiNames);
    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

module.exports = postSignup;
