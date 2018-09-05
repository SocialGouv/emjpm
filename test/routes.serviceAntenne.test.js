process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : serviceAntenne", () => {
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

  describe("GET /api/v1/mandataires/1/antennes", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1/antennes");
    it("should get list of antennes of a mandataire", () =>
      logUser(server).then(agent =>
        agent.get("/api/v1/mandataires/1/antennes").then(function(res) {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(1);
          res.body[0].code_postal.should.eql("62000");
        })
      ));
  });

  describe("POST /api/v1/mandataires/1/antennes", () => {
    shouldBeProtected(server, "POST", "/api/v1/mandataires/1/antennes");

    it("should post antennes for given mandataire", () =>
      logUser(server).then(agent =>
        agent
          .post("/api/v1/mandataires/1/antennes")
          .send({
            code_postal: "28000",
            ville: "Chartres",
            etablissement: "peu pas",
            email: "ad@ad.com",
            adresse: "1 rue de test",
            telephone: "00 00 00 00 00",
            mesures_en_cours: 236,
            dispo_max: 250
          })
          .then(res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(2);
          })
      ));
  });

  // it("should throw when posting commentaire on invalid mandataire", done => {
  //   // TODO
  //   "1".should.eql(2);
  // });
  // describe("PUT /api/v1/mandataires/1/antennes/1", () => {
  //   shouldBeProtected(server, "PUT", "/api/v1/mandataires/1/antennes/1");
  //
  //   it("should update a mesure for a given antennes", () =>
  //     logUser(server).then(agent =>
  //       agent
  //         .put("/api/v1/mandataires/1/antennes/1")
  //         .send({
  //           code_postal: "10000"
  //         })
  //         .then(res => {
  //           res.redirects.length.should.eql(0);
  //           res.status.should.eql(200);
  //           res.type.should.eql("application/json");
  //           res.body[0].code_postal.should.eql("10000");
  //         })
  //     ));
  // });
  describe("DELETE /api/v1/mandataires/1/antennes/1", () => {
    shouldBeProtected(server, "DELETE", "/api/v1/mandataires/1/antennes/1");

    it("should delete antenne for given mandataire", () =>
      logUser(server).then(agent =>
        agent.delete("/api/v1/mandataires/1/antennes/1").then(res => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(0);
        })
      ));

    it("should NOT delete antenne for another mandataire", () =>
      logUser(server).then(agent =>
        agent.delete("/api/v1/mandataires/1/antennes/2").then(res => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(1);
        })
      ));
  });
});
