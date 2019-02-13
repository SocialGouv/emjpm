const chai = require("chai");
chai.should();

// maps to test seed files
const userTypes = {
  default: {
    username: "jeremy",
    password: "johnson123"
  },
  mandataire: {
    username: "jeremy",
    password: "johnson123"
  },
  service: {
    username: "service1",
    password: "service1"
  },
  ti: {
    username: "ti1",
    password: "ti1"
  },
  admin: {
    username: "admin",
    password: "admin"
  }
};

const logUser = (server, creds = userTypes.default) => {
  const agent = chai.request.agent(server);
  return agent
    .post("/auth/login")
    .send(creds)
    .then(json => {
      const jwtToken = json.body.token;
      return jwtToken;
    });
};

const getCreds = type => userTypes[type] || userTypes.default;

const getOtherTypes = type =>
  Object.keys(userTypes).filter(key => ["default", type].indexOf(key) == -1);

const shouldBeProtected = (server, method, url, options = {}) => {
  // test typeRequired tests
  const agent = chai.request.agent(server);
  if (options.type) {
    it(`${method} ${url} should be accessible to ${options.type}`, () =>
      logUser(server, getCreds(options.type)).then(token =>
        agent[method.toLowerCase()](url)
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(200);
          })
      ));

    getOtherTypes(options.type).forEach(other => {
      it(`${method} ${url} should NOT be accessible to ${other}`, () =>
        logUser(server, getCreds(other)).then(token =>
          agent[method.toLowerCase()](url)
            .set("Authorization", "Bearer " + token)
            .then(res => {
              res.status.should.eql(401);
            })
        ));
    });
  } else {
    it(`${method} ${url} should be protected`, () =>
      logUser(server, getCreds(userTypes.default)).then(token =>
        agent[method.toLowerCase()](url)
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(err => true)
      ));
  }
};

module.exports = { logUser, shouldBeProtected };
