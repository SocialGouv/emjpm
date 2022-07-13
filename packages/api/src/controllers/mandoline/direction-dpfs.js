const { User, Direction, Sdpf, Departement } = require("~/models");
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
    [direction] = await Direction.query().where("user_id", userId);

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
  let eligibleDepartments;
  try {
    const { type: directionType } = direction;
    const departmentList = await Departement.query();

    switch (directionType) {
      case "national":
        services = await Sdpf.query();

        for (const service of services) {
          service.departement = departmentList.find(
            (d) => d.id === service.departement
          );
        }
        break;
      case "departemental":
        services = await Sdpf.query().find(
          "departement",
          direction.departement_code
        );
        // temporary workaround for deprecated single departement by service
        for (const service of services) {
          service.departement = departmentList.find(
            (d) => d.id === service.departement
          );
        }
        break;
      case "regional":
        eligibleDepartments = departmentList
          .filter((d) => {
            return d.id_region === direction.region_id;
          })
          .map((x) => x.id);

        services = await Sdpf.query().whereIn(
          "departement",
          eligibleDepartments
        );

        // temporary workaround for deprecated single departement by service
        for (const service of services) {
          service.departement = departmentList.find(
            (d) => d.id === service.departement
          );
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
