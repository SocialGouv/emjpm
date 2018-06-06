process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : commentaires", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    // return knex.migrate.rollback();
  });

  shouldBeProtected(server, "GET", "/api/v1/mandataires/1/commentaires");

  describe("GET /api/v1/mandataires/1/commentaires", () => {
    it("should get list of commentaires for given mandataire", () =>
      logUser(server, {
        username: "ti1",
        password: "ti1"
      }).then(agent =>
        agent.get("/api/v1/mandataires/1/commentaires").then(res => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(1);
          res.body[0].co_comment.should.eql("Hello, world 2");
        })
      ));
    it("should NOT get list of commentaires for a mandataire not in my TI", () =>
      logUser(server, {
        username: "ti1",
        password: "ti1"
      }).then(agent =>
        agent.get("/api/v1/mandataires/3/commentaires").then(res => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(0);
        })
      ));
  });

  shouldBeProtected(server, "POST", "/api/v1/mandataires/1/commentaires");

  it("should post commentaire for given mandataire", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(agent =>
      agent
        .post("/api/v1/mandataires/1/commentaires")
        .send({
          co_comment: "this is a super comment"
        })
        .then(function(res) {
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          res.body[1].co_comment.should.eql("this is a super comment");

          return knex
            .from("commentaires")
            .where({
              ti_id: 2,
              mandataire_id: 1,
              co_comment: "this is a super comment"
            })
            .then(res => {
              res.length.should.eql(1);
            });
        })
    ));
  it("should NOT post commentaire for a mandataire not in my TI", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(agent =>
      agent
        .post("/api/v1/mandataires/3/commentaires")
        .send({
          co_comment: "this is a super comment"
        })
        .catch(res => {
          return true;
        })
        .then(res =>
          knex
            .from("commentaires")
            .where({
              co_comment: "this is a super comment"
            })
            .then(res => {
              res.length.should.eql(0);
            })
        )
    ));

  //});
  // it("should throw when posting commentaire on invalid mandataire", done => {
  //   // TODO
  //   "1".should.eql(2);
  // });

  shouldBeProtected(server, "DELETE", "/api/v1/mandataires/1/commentaires/1");

  it("should delete commentaire for given mandataire", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(agent =>
      agent.delete("/api/v1/mandataires/1/commentaires/1").then(res => {
        // test response
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql("application/json");
        res.body.length.should.eql(1);
        // test DB
        return knex
          .select()
          .from("commentaires")
          .then(res => res.length.should.eql(2));
      })
    ));

  it("should NOT delete commentaire for another mandataire", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(agent =>
      agent.delete("/api/v1/mandataires/3/commentaires/3").then(res => {
        // test response
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql("application/json");
        res.body.length.should.eql(0);
        // test DB
        return knex
          .select()
          .from("commentaires")
          .then(res => res.length.should.eql(2));
      })
    ));
});
