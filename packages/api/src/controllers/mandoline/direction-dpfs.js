const { User, Direction, Service } = require("~/models");
const { isDirection } = require("@emjpm/biz");

const getDirectionDpfs = async (req, res) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;
  const {
    user: { id: userId },
  } = token;

  let user;
  try {
    // user = await User.query().findById(userId);
    user = await User.query().findById(userId);

    console.log(user);
  } catch (error) {
    return res.status(422).json({
      errors: [{ error: `${error}` }],
    });
  }

  if (!user) {
    return res.status(400).json({
      errors: [{ error: `no user find for this token` }],
    });
  }

  if (!isDirection(user)) {
    return res.status(422).json({
      errors: [
        { error: "this api is only allowed for user of type 'direction'" },
      ],
    });
  }

  let error;
  let direction;
  try {
    [direction] = await Direction.query()
      .where("user_id", userId)
      .withGraphFetched(
        "[departement_services(selectAll, selectMesuresAwaiting, selectMesuresInProgress).[departements], region_service_departements.[services(selectAll, selectMesuresAwaiting, selectMesuresInProgress).[departements]]]"
      );

    if (!direction) {
      error = "user's direction undefined";
    }
  } catch (err) {
    error = err;
  }
  if (error) {
    return res.status(422).json({
      errors: [{ error: `${error}` }],
    });
  }

  let services;
  try {
    const { type: directionType } = direction;
    switch (directionType) {
      case "national":
        services = await Service.query()
          .withGraphFetched("[departements]")
          .modify("selectAll")
          .modify("selectMesuresAwaiting")
          .modify("selectMesuresInProgress")
          .select();
        for (const service of services) {
          service.departement = service.departements[0];
        }
        break;
      case "departemental":
        services = direction.departement_services;
        // temporary workaround for deprecated single departement by service
        for (const service of services) {
          service.departement = service.departements[0];
        }
        break;
      case "regional":
        services = Object.values(
          direction.region_service_departements.reduce((acc, { services }) => {
            for (const service of services) {
              acc[service.id] = service;
            }
            return acc;
          }, {})
        );
        // temporary workaround for deprecated single departement by service
        for (const service of services) {
          service.departement = service.departements[0];
        }
        break;
      default:
        throw new Error(
          "unexpected type '" + directionType + "' for direction"
        );
    }
  } catch (err) {
    error = err;
  }

  if (error) {
    return res.status(422).json({
      errors: [{ error: `${error}` }],
    });
  }

  return res.status(200).json(services);
};

module.exports = { getDirectionDpfs };
