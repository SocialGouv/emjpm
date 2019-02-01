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

describe("routes : commentaires", () => {
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

  describe("GET /api/v1/mandataires/1/commentaires", () => {
    it("should get list of commentaires for given mandataire", done => {
      var agent = chai.request.agent(server);
      agent
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(function(res) {
          return agent
            .get("/api/v1/mandataires/1/commentaires")
            .then(function(res) {
              res.redirects.length.should.eql(0);
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.length.should.eql(1);
              res.body[0].co_comment.should.eql("Hello, world");
              done();
              // todo : check que les commentaires soient bien filtés
            })
            .catch(err => {
              throw err;
            });
        });
    });
  });
  it("should post commentaire for given mandataire", done => {
    var agent = chai.request.agent(server);
    agent
      .post("/auth/login")
      .send({
        username: "jeremy",
        password: "johnson123"
      })
      .then(function(res) {
        return agent
          .post("/api/v1/mandataires/1/commentaires")
          .send({
            co_comment: "this is a super comment"
          })
          .then(function(res) {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(2);
            //res.body[0].co_comment.should.eql("Hello, world");
            done();
            // todo : check que les commentaires soient bien filtés
          });
      })
      .catch(err => {
        throw err;
      });
  });
  // it("should throw when posting commentaire on invalid mandataire", done => {
  //   // TODO
  //   "1".should.eql(2);
  // });

  it("should delete commentaire for given mandataire", done => {
    var agent = chai.request.agent(server);
    agent
      .post("/auth/login")
      .send({
        username: "jeremy",
        password: "johnson123"
      })
      .then(function(res) {
        return agent.delete("/api/v1/mandataires/1/commentaires/1").then(function(res) {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(0);
          done();
        });
      })
      .catch(err => {
        throw err;
      });
  });
});
