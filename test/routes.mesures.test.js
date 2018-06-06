process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : mesures", () => {
  beforeEach(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  );

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("GET /api/v1/mesures", () => {
    shouldBeProtected(server, "GET", "/api/v1/mesures");

    it("ti should get list of mesures by mandataires", () =>
      logUser(server, {
        username: "ti1",
        password: "ti1"
      }).then(agent =>
        agent
          .get("/api/v1/mesures")
          .then(function(res) {
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(2);
          })
          .catch(err => {
            throw err;
          })
      ));

    it("should be accessible by TI only", () =>
      logUser(server, {
        username: "jeremy",
        password: "johnson123"
      }).then(agent =>
        agent
          .get("/api/v1/mesures")
          .then(function(res) {
            res.status.should.eql(401);
          })
          .catch(err => true)
      ));
  });
});
