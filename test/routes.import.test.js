process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

const { logUser } = require("./utils");

chai.should();
chai.use(chaiHttp);

const knex = require("../db/knex");

describe("routes : import", () => {
  let server;
  let agent;

  before(() => {
    server = require("../app");
    agent = chai.request.agent(server);
  });

  beforeEach(() => {
    knex.raw("DELETE FROM 'knex_migrations_lock';");
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  after(() => {});

  describe("Should import correctly", () => {
    it("should POST to /mandataires/mesures/bulk and add 2 mesures", () =>
      logUser(server, {
        username: "jeremy",
        password: "johnson123"
      }).then(async token => {
        (await knex.from("mesures").count())[0].count.should.eql("4");
        return agent
          .post("/api/v1/mandataires/mesures/bulk")
          .send([1, 2])
          .set("Authorization", "Bearer " + token)
          .then(async res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.body.success.should.eql(true);
            res.body.message.should.eql("2 Mesures importées.");
            (await knex.from("mesures").count())[0].count.should.eql("6");
            const mesures = await knex
              .from("mesures")
              .orderBy("id", "desc")
              .limit(2);
            mesures[0].mandataire_id.should.eql(1);
            mesures[0].status.should.eql("Mesure en cours");
            mesures[1].mandataire_id.should.eql(1);
            mesures[1].status.should.eql("Mesure en cours");
          });
      }));

    it("should SKIP existing references", () =>
      logUser(server, {
        username: "jeremy",
        password: "johnson123"
      }).then(async token => {
        (await knex.from("mesures").count())[0].count.should.eql("4");
        return agent
          .post("/api/v1/mandataires/mesures/bulk")
          .send([{ numero_dossier: "abc" }])
          .set("Authorization", "Bearer " + token)
          .then(async res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.body.success.should.eql(true);
            res.body.message.should.eql("1 Mesures importées.");
            (await knex.from("mesures").count())[0].count.should.eql("5");
            return agent
              .post("/api/v1/mandataires/mesures/bulk")
              .send([{ numero_dossier: "abc" }])
              .set("Authorization", "Bearer " + token)
              .then(async res => {
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                //  res.body.success.should.eql(false);
                res.body.message.should.eql(
                  "0 Mesures importées.\n\nLignes non importées : 2."
                );
                (await knex.from("mesures").count())[0].count.should.eql("5");
              });
          });
      }));
  });
});
