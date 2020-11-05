const { validationResult } = require("express-validator");
const { User } = require("../../models/User");
const { Mandataire } = require("../../models/Mandataire");
const { Magistrat } = require("../../models/Magistrat");
const { MandataireTis } = require("../../models/MandataireTis");
const { UserRole } = require("../../models/UserRole");
const {
  ServiceMemberInvitation,
} = require("../../models/ServiceMemberInvitation");
const { ServiceMember } = require("../../models/ServiceMember");
const { Role } = require("../../models/Role");
const { Direction } = require("../../models/Direction");
const { errorHandler } = require("../../db/errors");
const { inscriptionEmail } = require("../../email/inscription");

const createMagistrat = async (magistrat, user) => {
  const { ti } = magistrat;
  if (!ti) {
    throw new Error(
      "Renseigner un tribunal est obligatoire pour un compte 'magistrat'"
    );
  }
  return Magistrat.query().allowInsert("[user_id, ti_id]").insert({
    ti_id: ti,
    user_id: user.id,
  });
};

const createMandataire = async (mandataireDatas, user_id) => {
  const {
    telephone,
    telephone_portable,
    adresse,
    code_postal,
    department_id,
    ville,
    dispo_max,
    siret,
    latitude,
    longitude,
    genre,
  } = mandataireDatas;

  const mandataire = await Mandataire.query()
    .allowInsert(
      "[etablissement,siret, telephone,user_id,telephone_portable,adresse,code_postal,ville, department_id, dispo_max]"
    )
    .insert({
      adresse,
      code_postal,
      department_id,
      dispo_max,
      genre,
      latitude,
      longitude,
      siret,
      telephone,
      telephone_portable,
      user_id,
      ville,
    });

  return mandataire;
};

const createMandataireTis = (tis, mandataire_id) => {
  if (!tis || tis.length === 0) {
    return true;
  }
  Promise.all(
    tis.map((ti_id) =>
      MandataireTis.query().allowInsert("[mandataire_id, ti_id]").insert({
        mandataire_id,
        ti_id,
      })
    )
  );
};

const createDirection = (userId, type) => {
  return Direction.query().insert({
    type,
    user_id: userId,
  });
};

const createRole = async (userId, type) => {
  const [role] = await Role.query().where("name", type);
  return UserRole.query().allowInsert("[user_id,role_id]").insert({
    role_id: role.id,
    user_id: userId,
  });
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
    const { body } = req;
    const { invitation } = body;
    const { type, nom, prenom, password, username, email } = body.user;

    const user = await User.query()
      .allowInsert("[username, password,role,nom,prenom,email]")
      .insert({
        active: invitation ? true : false,
        email: email.toLowerCase().trim(),
        nom,
        password,
        prenom,
        type,
        username,
      });

    await createRole(user.id, type);

    switch (type) {
      case "individuel":
      case "prepose": {
        const mandataire = await createMandataire(body.mandataire, user.id);
        createMandataireTis(body.tis, mandataire.id);
        break;
      }
      case "service": {
        const {
          invitation,
          service: { service_id },
        } = body;

        await ServiceMember.query().allowInsert("[user_id,service_id]").insert({
          service_id,
          user_id: user.id,
        });

        if (invitation) {
          await ServiceMemberInvitation.query()
            .delete()
            .where("id", invitation.id);
        }

        break;
      }
      case "ti": {
        const { cabinet } = body.magistrat;
        await User.query().update({ cabinet }).where("id", user.id);
        await createMagistrat(body.magistrat, user);
        break;
      }
      case "direction": {
        const { directionType } = body.direction;

        let roleName = "direction_nationale";
        if (directionType === "regional" || directionType === "departemental") {
          roleName = "direction_territoriale";
        }
        await createRole(user.id, roleName);
        await createDirection(user.id, directionType);

        break;
      }
      default:
        return;
    }

    const code_postal = body.mandataire ? body.mandataire.code_postal : "";

    if (!user.active) {
      inscriptionEmail(nom, prenom, email, code_postal, type);
    }

    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

module.exports = signup;
