process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : PreposeEtablissement", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("/api/v1/mandataires/1/etablissements", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1/etablissements");
    shouldBeProtected(server, "POST", "/api/v1/mandataires/1/etablissements");
    shouldBeProtected(server, "PUT", "/api/v1/mandataires/1/etablissements/1");
    shouldBeProtected(
      server,
      "DELETE",
      "/api/v1/mandataires/1/etablissements/1"
    );

    it("should get list of etablissements of a mandataire", () =>
      logUser(server, {
        username: "adrien1",
        password: "aaaaaa"
      }).then(agent =>
        agent
          .get("/api/v1/mandataires/1/etablissements")
          .then(res => {
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(1);
            res.body[0].code_postal.should.eql("62000");
            // todo : check que les mandataires soient bien filtrés
          })
          .catch(err => {
            throw err;
          })
      ));
    it("should post etablissements for given mandataire", () =>
      logUser(server, {
        username: "adrien1",
        password: "aaaaaa"
      })
        .then(agent =>
          agent
            .post("/api/v1/mandataires/1/etablissements")
            .send({
              code_postal: "28000",
              ville: "Chartres",
              etablissement: "peu pas",
              adresse: "Hello rue du test",
              telephone: "00 00 00 00 00",
              mandataire_id: 1
            })
            .then(res => {
              res.redirects.length.should.eql(0);
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.length.should.eql(2);
            })
        )
        .catch(err => {
          throw err;
        }));

    it("should update a etablissements for a given mandataire", () =>
      logUser(server, {
        username: "adrien1",
        password: "aaaaaa"
      })
        .then(agent =>
          agent
            .put("/api/v1/mandataires/1/etablissements/1")
            .send({
              code_postal: "10000"
            })
            .then(res => {
              res.redirects.length.should.eql(0);
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body[0].code_postal.should.eql("10000");
            })
        )
        .catch(err => {
          throw err;
        }));

    it("should delete etablissement for given mandataire", () =>
      logUser(server, {
        username: "adrien1",
        password: "aaaaaa"
      })
        .then(agent =>
          agent.delete("/api/v1/mandataires/1/etablissements/1").then(res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(0);
          })
        )
        .catch(err => {
          throw err;
        }));
  });
});
