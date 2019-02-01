process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : mandataireMesures", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    //return knex.migrate.rollback();
  });

  describe("GET /api/v1/mandataires/1/mesures", () => {
    shouldBeProtected(server, "GET", "/api/v1/mandataires/1/mesures");
    it("should get list of mesures of a mandataire", () =>
      logUser(server).then(agent =>
        agent.get("/api/v1/mandataires/1/mesures").then(res => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          res.body[0].code_postal.should.eql("62000");
          // todo : check que les mandataires soient bien filtés
        })
      ));

    shouldBeProtected(server, "POST", "/api/v1/mandataires/1/mesures");
    it("should post mesure for given mandataire", () =>
      logUser(server).then(agent =>
        agent
          .post("/api/v1/mandataires/1/mesures")
          .send({
            code_postal: "28000",
            ville: "Chartres",
            etablissement: "peu pas",
            latitude: 1,
            longitude: 1,
            postDate: "2010-10-05",
            annee: "2010-10-05",
            type: "preposes",
            date_ouverture: "2010-10-05",
            residence: "oui",
            civilite: "madame",
            status: "Mesure en cours"
          })
          .then(function(res) {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(3);
          })
      ));

    // it("should throw when posting commentaire on invalid mandataire", done => {
    //   // TODO
    //   "1".should.eql(2);
    // });

    shouldBeProtected(server, "PUT", "/api/v1/mandataires/1/mesures/1");

    it("should update a mesure for a given mandataire", () =>
      logUser(server).then(agent =>
        agent
          .put("/api/v1/mandataires/1/mesures/1")
          .send({
            code_postal: "10000"
          })
          .then(function(res) {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(2);
            res.body.find(i => i.id === 1).code_postal.should.eql("10000");
          })
      ));
  });

  it("should NOT update a mesure for another mandataire", () =>
    logUser(server).then(agent =>
      agent
        .put("/api/v1/mandataires/1/mesures/2")
        .send({
          code_postal: "10000"
        })
        .then(res =>
          knex
            .table("mesures")
            .where("id", 2)
            .first()
            .then(data => {
              data.code_postal.should.not.eql("10000");
            })
        )
    ));
});
