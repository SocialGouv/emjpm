//

const request = require("supertest");
const server = require("@emjpm/api/app");

//

exports.userTypes = {
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

const getOtherTypes = types =>
  Object.keys(exports.userTypes).filter(key => types.indexOf(key) == -1);

// ensure some method/url is only available to some kind of user
exports.shouldBeProtected = (method, url, options = {}) => {
  test(`${method} ${url} should NOT be accessible to anonymous`, async () => {
    const response = await request(server)[method.toLowerCase()](url);
    expect(response.status).toBe(401);
  });
  if (options.type) {
    const types = Array.isArray(options.type) ? options.type : [options.type];
    types.forEach(type => {
      test(`${method} ${url} should be accessible to ${type}`, async () => {
        const token = await exports.getTokenByUserType(type);
        const response = await request(server)
          [method.toLowerCase()](url)
          .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        // ?? expect(response.status).toMatchSnapshot();
      });
    });
    getOtherTypes(types).forEach(other => {
      test(`${method} ${url} should NOT be accessible to ${other}`, async () => {
        const token = await exports.getTokenByUserType(other);
        const response = await request(server)
          [method.toLowerCase()](url)
          .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(401);
      });
    });
  } else {
    test(`${method} ${url} should be protected`, async () => {
      const token = await exports.getTokenByUserType(
        exports.userTypes.mandataire
      );
      const response = await request(server)
        [method.toLowerCase()](url)
        .set("Authorization", "Bearer " + token);
      expect(response.status).toBe(401);
    });
  }
};

exports.logMeIn = async (userType = exports.userTypes.mandataire) =>
  request(server)
    .post("/auth/v2/login")
    .send(userType);

exports.getTokenByUserType = async userType =>
  (await exports.logMeIn(exports.userTypes[userType])).body.token;
