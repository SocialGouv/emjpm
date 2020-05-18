const passportCustom = require("passport-custom");

const CustomStrategy = passportCustom.Strategy;

// http://www.passportjs.org/packages/passport-trusted-header/
const strategy = new CustomStrategy(function(req, done) {
  const secret = req.headers["hasura_web_hook_secret"];

  if (secret === process.env["HASURA_WEB_HOOK_SECRET"]) {
    // continue
    const user = buildHasuraUser(req);
    return done(undefined, user);
  } else {
    // error
    return done(undefined, false);
  }
});

function buildHasuraUser(req) {
  const {
    "x-hasura-role": role,
    "x-hasura-user-id": userId,
    "x-hasura-service-id": serviceId
  } = req.body.session_variables;

  const hasuraUser = {
    __auth_type__: "hasura",
    role,
    userId: userId !== "null" ? parseInt(userId) : undefined,
    serviceId: serviceId !== "null" ? parseInt(serviceId) : undefined
  };
  return hasuraUser;
}

const SERIALIZED_PREFIX = "__hasura__;";
function serializeUser(hasuraUser) {
  return (
    SERIALIZED_PREFIX +
    [hasuraUser.role, hasuraUser.userId, hasuraUser.serviceId]
      .map(x => (x ? `${x}` : ""))
      .join(";")
  );
}

function deserializeUser(str) {
  const chunks = str.split(";");
  if (chunks.length === 4) {
    const hasuraUser = {
      __auth_type__: "hasura",
      role: chunks[1],
      userId: chunks[2] !== "" ? parseInt(chunks[2]) : undefined,
      serviceId: chunks[3] !== "" ? parseInt(chunks[3]) : undefined
    };
    return hasuraUser;
  }
  return undefined;
}

module.exports = {
  strategy,
  userSerializer: {
    serialize: serializeUser,
    deserialize: deserializeUser,
    PREFIX: SERIALIZED_PREFIX
  }
};
