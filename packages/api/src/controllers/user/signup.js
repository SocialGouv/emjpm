const { validationResult } = require("express-validator");
const { User } = require("~/models");
const { OcmiMandataire } = require("~/models");
const { Mandataire } = require("~/models");
const { Magistrat } = require("~/models");
const { Greffier } = require("~/models");
const { UserRole } = require("~/models");
const { ServiceMemberInvitation } = require("~/models");
const { AdminInvitation } = require("~/models");
const { ServiceMember } = require("~/models");
const { Role } = require("~/models");
const { Direction } = require("~/models");
const { Service } = require("~/models");
const { errorHandler } = require("~/db/errors");
const { inscriptionEmail } = require("~/email/inscription");

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

const createGreffier = async (greffier, user) => {
  const { ti } = greffier;
  if (!ti) {
    throw new Error(
      "Renseigner un tribunal est obligatoire pour un compte 'greffier'"
    );
  }
  return Greffier.query().allowInsert("[user_id, ti_id]").insert({
    ti_id: ti,
    user_id: user.id,
  });
};

const createMandataire = async (mandataireDatas, user_id) => {
  const {
    telephone,
    telephone_portable,
    location_adresse,
    code_postal,
    ville,
    departement_code,
    dispo_max,
    siret,
    latitude,
    longitude,
  } = mandataireDatas;

  let sync_ocmi_enable = false;
  if (siret) {
    const ocmiMandataire = await OcmiMandataire.query()
      .where({ siret })
      .first();
    sync_ocmi_enable = !!ocmiMandataire?.siret;
  }

  const mandataire = await Mandataire.query()
    .allowInsert(
      "[siret,telephone,user_id,telephone_portable,location_adresse,code_postal,ville,departement_code,dispo_max]"
    )
    .insert({
      code_postal,
      departement_code,
      dispo_max,
      latitude,
      location_adresse,
      longitude,
      siret,
      sync_ocmi_enable,
      telephone,
      telephone_portable,
      user_id,
      ville,
    });

  return mandataire;
};

const createDirection = (userId, type, regionId, departementCode) => {
  return Direction.query().insert({
    departement_code: departementCode,
    region_id: regionId,
    type,
    user_id: userId,
  });
};

// const createDpf = (mandataireDatas, user_id) => {
//   console.log("====>mandataireDatas, user_id", mandataireDatas, user_id);
// };

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
    const { nom, prenom, password, email, genre, secret_2fa } = body.user;
    let { type } = body.user;

    if (invitation) {
      type = invitation.type;
      let invitationModel;
      switch (type) {
        case "service": {
          invitationModel = ServiceMemberInvitation;
          break;
        }
        case "admin": {
          invitationModel = AdminInvitation;
          break;
        }
        default:
          throw new Error(`Unexpected user type "${type}" for invitation`);
      }
      const invitationRow = await invitationModel
        .query()
        .where("token", invitation.token);
      if (invitationRow.length < 1) {
        return res.status(410).send({
          errors: [
            {
              data: {},
              type: "InvalidToken",
            },
          ],
        });
      }
    }

    if (type === "admin" && !invitation) {
      return;
    }

    const user = await User.query()
      .allowInsert("[password,role,nom,prenom,email,secret_2fa]")
      .insert({
        active: invitation ? true : false,
        email: email.toLowerCase().trim(),
        genre,
        nom,
        password,
        prenom,
        secret_2fa,
        type,
      });

    switch (type) {
      case "admin": {
        await createRole(user.id, type);
        break;
      }
      case "individuel":
      case "prepose": {
        await createRole(user.id, type);
        await createMandataire(body.mandataire, user.id, type);
        break;
      }
      case "service": {
        await createRole(user.id, type);
        const {
          service: { service_id },
        } = body;

        const service = await Service.query().findOne("id", service_id);
        await ServiceMember.query()
          .allowInsert("[user_id,service_id]")
          .insert({
            is_admin: service.email === user.email,
            service_id,
            user_id: user.id,
          });
        break;
      }
      case "ti": {
        await createRole(user.id, type);
        const { cabinet } = body.magistrat;
        await User.query().update({ cabinet }).where("id", user.id);
        await createMagistrat(body.magistrat, user);
        break;
      }
      case "greffier": {
        await createRole(user.id, type);
        const { cabinet } = body.greffier;
        await User.query().update({ cabinet }).where("id", user.id);
        await createGreffier(body.greffier, user);
        break;
      }
      case "direction": {
        await createRole(user.id, type);
        const {
          direction: { directionType, departementCode, regionId },
        } = body;

        let roleName = "direction_nationale";
        if (directionType === "regional" || directionType === "departemental") {
          roleName = "direction_territoriale";
        }
        await createRole(user.id, roleName);
        await createDirection(
          user.id,
          directionType,
          regionId,
          departementCode
        );

        break;
      }
      case "dpfi": {
        // await createRole(user.id, type);
        // await createDpf(body.mandataire, user.id, type);
        break;
      }
      default:
        return;
    }

    if (invitation) {
      switch (type) {
        case "service":
          await ServiceMemberInvitation.query()
            .delete()
            .where("token", invitation.token);
          break;
        case "admin":
          await AdminInvitation.query()
            .delete()
            .where("token", invitation.token);
          break;
      }
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
