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

describe("routes : mandataires", () => {
  beforeEach(() => {
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
    // TODO: TI only ?
    it("should be accessible to ti ONLY", () =>
      logUser(server).then(agent =>
        agent
          .get("/api/v1/mandataires")
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(() => true)
      ));
    it("ti should get a list of 2 mandataires", () =>
      logUser(server, { username: "ti1", password: "ti1" }).then(agent =>
        agent.get("/api/v1/mandataires").then(function(res) {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
        })
      ));
    // it("should get a list of 2 mandataires", () =>
    //   logUser(server).then(agent =>
    //     agent.get("/api/v1/mandataires").then(function(res) {
    //       res.redirects.length.should.eql(0);
    //       res.status.should.eql(200);
    //       res.type.should.eql("application/json");
    //       res.body.length.should.eql(2);
    //     })
    //   ));
  });

  describe("GET /api/v1/mandataires/1", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1");

    it("should get a single mandataire", () =>
      logUser(server, { username: "adrien1", password: "aaaaaa" }).then(agent =>
        agent.get("/api/v1/mandataires/1").then(function(res) {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.code_postal.should.eql("62000");
        })
      ));

    it("should not read another mandataire", () =>
      logUser(server, { username: "adrien1", password: "aaaaaa" }).then(agent =>
        agent
          .get("/api/v1/mandataires/2")
          .then(res => {
            res.status.should.eql(401);
          })
          .catch(() => true)
      ));
  });

  describe("PUT /api/v1/mandataires/1", () => {
    shouldBeProtected(server, "PUT", "/api/v1/mandataires/1");
    it("should update mandataire", () =>
      logUser(server, { username: "adrien1", password: "aaaaaa" }).then(agent =>
        agent
          .put("/api/v1/mandataires/1")
          .send({
            code_postal: "10000"
          })
          .then(res => {
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.code_postal.should.eql("10000");
          })
      ));
    it("should not update another mandataire", () =>
      logUser(server, { username: "adrien1", password: "aaaaaa" }).then(agent =>
        agent
          .put("/api/v1/mandataires/2")
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
