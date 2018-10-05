process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : tis", () => {
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

  describe("GET /api/v1/mandataires/1/tis", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1/tis");
    it("should get list of tis of a mandataire", () =>
      logUser(server).then(agent =>
        agent.get("/api/v1/mandataires/1/tis").then(res => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          // todo : check que les mandataires soient bien filtés
        })
      ));

    shouldBeProtected(server, "GET", "/api/v1/mandataires/tis");
    it("should get list of tis", () =>
      logUser(server).then(agent =>
        agent.get("/api/v1/mandataires/tis").then(res => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          // todo : check que les mandataires soient bien filtés
        })
      ));

    shouldBeProtected(server, "GET", "/api/v1/mandataires/1/tis-by-mandataire");
    it("should get list of tis of a mandataire by params", () =>
      logUser(server).then(agent =>
        agent.get("/api/v1/mandataires/1/tis-by-mandataire").then(res => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          // todo : check que les mandataires soient bien filtés
        })
      ));

    shouldBeProtected(server, "POST", "/api/v1/mandataires/1/tis");
    it("should post ti for given mandataire", () =>
      logUser(server).then(agent =>
        agent
          .post("/api/v1/mandataires/1/tis")
          .send({
            mandataire_id: 1,
            ti_id: 2
          })
          .then(function(res) {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(3);
          })
      ));
  });

  describe("DELETE /api/v1/mandataires/1/tis/2", () => {
    shouldBeProtected(server, "DELETE", "/api/v1/mandataires/1/tis/2");
    it("should delete ti for given mandataire", () =>
      logUser(server).then(agent =>
        agent.delete("/api/v1/mandataires/1/tis/2").then(res => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(1);
        })
      ));
  });
});
