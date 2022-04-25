const express = require("express");

const isInt = require("~/utils/std/isInt");

const { User, Service } = require("~/models");

const router = express.Router();

const allowedRoles = ["direction", "service"];

router.use(async (_req, res, next) => {
  const {
    locals: {
      oauth: { token },
    },
  } = res;

  const {
    user: { id: user_id },
  } = token;

  let user;
  try {
    user = await User.query()
      .findById(user_id)
      .withGraphFetched(
        "[direction.[departement, region], service.[departements]]"
      );
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

  if (!allowedRoles.includes(user.type)) {
    return res.status(403).json({
      error:
        "the usage of this api is reserved for profiles: " +
        allowedRoles.join(","),
    });
  }

  res.api = { user };

  next();
});

router.get("/:id/users", async (req, res) => {
  const { user } = res.api;
  const serviceId = isInt(req.params.id) ? parseInt(req.params.id, 10) : false;
  if (!serviceId) {
    return res.status(400).json({
      error: "bad format for service id",
    });
  }

  const service = await Service.query()
    .findById(serviceId)
    .withGraphFetched("[users, departements]");

  if (!service) {
    return res.status(404).json({
      error: "service not found",
    });
  }

  let authGranted;
  if (user.type === "direction") {
    if (user.direction.type === "national") {
      authGranted = true;
    } else if (user.direction.type === "regional") {
      if (
        service.departements.some(
          ({ id_region }) => id_region === user.direction.region_id
        )
      ) {
        authGranted = true;
      }
    } else if (user.direction.type === "departemental") {
      if (
        service.departements.some(
          ({ id }) => id === user.direction.departement_code
        )
      ) {
        authGranted = true;
      }
    }
  } else if (user.type === "service") {
    if (user.service.id === serviceId) {
      authGranted = true;
    }
  }

  if (!authGranted) {
    return res.status(403).json({
      error: "you are not allowed to access information on this service",
    });
  }

  const { users } = service;

  const result = users.map((user) => ({
    email: user.email,
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    type: user.type,
  }));

  return res.status(200).json(result);
});

module.exports = router;
