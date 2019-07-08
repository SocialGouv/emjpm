const passport = require("../auth/local");
const rasha = require("rasha");

const jwtConfig = require("../config/jwt");
const { validationResult } = require("express-validator");
const { User, Mandataire, Service, UserTi } = require("../db/schema");
const { updateLastLogin } = require("../db/queries/users");
const { addDataLogs } = require("../db/queries/logsData");
const { errorHandler } = require("../db/errors");

/**
 * Sends the JWT key set
 */
exports.getJwks = async (req, res) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey
  };
  const jwks = {
    keys: [jwk]
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(jwks, null, 2) + "\n");
  handleResponse(res, 200, jwks);
};

/**
 * Sign in using username and password and returns JWT
 */
exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return handleResponse(res, 400, { errors: errors.array() });
    }
    if (user) {
      updateLastLogin(user.id).then(() => {
        addDataLogs({
          user_id: user.id,
          action: "connexion",
          result: "success"
        });
        handleResponse(res, 200, user.getUser());
      });
    }
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  try {
    // eslint-disable-next-line
    const service =
      req.body.role === "service" &&
      (await Service.query()
        .allowInsert(
          "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
        )
        .insert({
          etablissement: req.body.etablissement,
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email,
          telephone: req.body.telephone,
          adresse: req.body.adresse,
          code_postal: req.body.code_postal,
          ville: req.body.ville,
          dispo_max: req.body.dispo_max
        }));

    const user = await User.query()
      .allowInsert("[username, password,role,nom,prenom,email]")
      .insert({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        nom: req.body.nom,
        prenom: req.body.prenom,
        cabinet: req.body.role === "ti" ? req.body.cabinet : null,
        email: req.body.email,
        service_id: service ? service.id : null
      });

    req.body.role === "individue" ||
      (req.body.role === "prepose" &&
        (await Mandataire.query()
          .allowInsert(
            "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
          )
          .insert({
            user_id: user.id,
            etablissement: req.body.etablissement,
            telephone: req.body.telephone,
            telephone_portable: req.body.telephone_portable,
            adresse: req.body.adresse,
            code_postal: req.body.code_postal,
            ville: req.body.ville
          })));

    await Promise.all(
      req.body.tis.map(ti_id =>
        UserTi.query()
          .allowInsert(
            "[etablissement, telephone,user_id,telephone_portable,adresse,code_postal,ville]"
          )
          .insert({
            user_id: user.id,
            ti_id
          })
      )
    );

    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}
