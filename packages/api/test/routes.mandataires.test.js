process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

const agent = chai.request.agent(server);

describe("routes : mandataires", () => {
  beforeEach(() => {
    knex.raw("DELETE FROM 'knex_migrations_lock';");
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("GET /api/v1/mandataires", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires");
    it("should be accessible to ti ONLY", () =>
      logUser(server).then(token =>
        agent
          .get("/api/v1/mandataires")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(() => true)
      ));
    it("ti should get a list of 2 mandataires", () =>
      logUser(server, { username: "ti1", password: "ti1" }).then(token =>
        agent
          .get("/api/v1/mandataires")
          .set("Authorization", "Bearer " + token)
          .then(function(res) {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(2);
          })
      ));
  });

  describe("GET /api/v1/mandataires/1", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1");

    it("should get a single mandataire", () =>
      logUser(server).then(token =>
        agent
          .get("/api/v1/mandataires/1")
          .set("Authorization", "Bearer " + token)
          .then(function(res) {
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.code_postal.should.eql("62000");
            res.body.type.should.eql("individuel");
          })
      ));

    it("should not read another mandataire", () =>
      logUser(server).then(token =>
        agent
          .get("/api/v1/mandataires/2")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(() => true)
      ));
  });

  describe("PUT /api/v1/mandataires/1", () => {
    shouldBeProtected(server, "PUT", "/api/v1/mandataires/1");
    it("should update mandataire", () =>
      logUser(server).then(token =>
        agent
          .put("/api/v1/mandataires/1")
          .set("Authorization", "Bearer " + token)
          .send({
            code_postal: "10000",
            nom: "testtest"
          })
          .then(res => {
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.code_postal.should.eql("10000");
          })
      ));
    it("should not update another mandataire", () =>
      logUser(server).then(token =>
        agent
          .put("/api/v1/mandataires/2")
          .set("Authorization", "Bearer " + token)
          .send({
            code_postal: "10000"
          })
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(() => true)
      ));
  });
});
