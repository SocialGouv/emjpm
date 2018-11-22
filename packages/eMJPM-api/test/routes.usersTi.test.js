process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

const agent = chai.request.agent(server);

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : usersTi", () => {
  beforeEach(() => {
    knex.raw("DELETE FROM 'knex_migrations_lock';");
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    //return knex.migrate.rollback();
  });

  describe("GET /api/v1/usersTi", () => {
    shouldBeProtected(server, "GET", "/api/v1/usersTi");
    it("should get information from my Ti", () =>
      logUser(server, { username: "ti1", password: "ti1" }).then(token =>
        agent
          .get("/api/v1/usersTi")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(200);
            res.body.code_postal.should.eql("75000");
            res.body.telephone.should.eql("0102030405");
          })
      ));
  });
});
