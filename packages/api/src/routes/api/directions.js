const express = require("express");

const { raw } = require("objection");

const isInt = require("~/utils/std/isInt");

const { User, Region } = require("~/models");

const router = express.Router();

router.use(async (req, res, next) => {
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
      .withGraphFetched("[direction.[departement, region]]");
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

  if (user.type !== "direction") {
    return res.status(403).json({
      error: "the usage of this api is reserved for direction profiles",
    });
  }

  res.api = { user };

  next();
});

router.get("/nationales", async (req, res) => {
  const agents = await User.query()
    .joinRelated("direction")
    .where("direction.type", "national");
  const result = agents.map(({ type, email, id, nom, prenom }) => ({
    direction: {
      type: "national",
    },
    email,
    id,
    nom,
    prenom,
    type,
  }));

  return res.status(200).json(result);
});

router.get("/regionales/:id", async (req, res) => {
  const { user } = res.api;
  const { direction } = user;
  if (direction.type !== "national") {
    return res.status(403).json({
      error:
        "the usage of this api is reserved for national direction profiles",
    });
  }

  let regionId = req.params.id;
  if (!isInt(regionId)) {
    const region = await Region.query()
      .first()
      .where(
        raw("replace(unaccent(lower(\"nom\")),'-',' ')"),
        regionId
          .toLowerCase()
          .replace(/-/g, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );
    regionId = region.id;
  }

  const agents = await User.query()
    .joinRelated("direction")
    .where({
      "direction.region_id": regionId,
      "direction.type": "regional",
    })
    .withGraphFetched("[direction.[region]]");

  const result = agents.map(({ type, email, id, nom, prenom, direction }) => ({
    direction,
    email,
    id,
    nom,
    prenom,
    type,
  }));

  return res.status(200).json(result);
});

router.get("/departementales/:id", async (req, res) => {
  const { user } = res.api;
  const { direction } = user;
  if (direction.type !== "national") {
    return res.status(403).json({
      error:
        "the usage of this api is reserved for national direction profiles",
    });
  }

  const departementCode = req.params.id;

  const agents = await User.query()
    .joinRelated("direction")
    .where({
      "direction.departement_code": departementCode,
      "direction.type": "departemental",
    })
    .withGraphFetched("[direction.[departement]]");

  const result = agents.map(({ type, email, id, nom, prenom, direction }) => ({
    direction,
    email,
    id,
    nom,
    prenom,
    type,
  }));

  return res.status(200).json(result);
});

router.get("/departementales", async (req, res) => {
  const { user } = res.api;
  const { direction } = user;
  if (direction.type !== "regional") {
    return res.status(403).json({
      error:
        "the usage of this api is reserved for regional direction profiles",
    });
  }
  const agents = await User.query()
    .joinRelated("[direction.[departement]]")
    .where("direction.type", "departemental")
    .where("direction:departement.id_region", direction.region_id)
    .withGraphFetched("[direction.[departement]]");

  const result = agents.map(({ type, email, id, nom, prenom, direction }) => ({
    direction,
    email,
    id,
    nom,
    prenom,
    type,
  }));

  return res.status(200).json(result);
});

module.exports = router;
