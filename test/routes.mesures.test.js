process.env.NODE_ENV = "test";
//process.env.PORT = 3010;

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");
//const logger = require("morgan");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : mesures", () => {
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

  describe("GET /api/v1/mesures", () => {
    it("should get list of mesures by mandataires", done => {
      var agent = chai.request.agent(server);
      agent
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(function(res) {
          return agent
            .get("/api/v1/mesures")
            .then(function(res) {
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.length.should.eql(1);
              res.body[0].latitude.should.eql(1);
              done();
              // todo : check que les mandataires soient bien filtés
            })
            .catch(err => {
              throw err;
            });
        });
    });
  });
});
