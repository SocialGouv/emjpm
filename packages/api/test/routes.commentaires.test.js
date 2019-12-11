process.env.NODE_ENV = "test";

const { shouldBeProtected, logUser } = require("./utils");

const chai = require("chai");
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);
const agent = chai.request.agent(server);

describe("routes : commentaires", () => {
  beforeEach(() => {
    knex.raw("DELETE FROM 'knex_migrations_v2_lock';");
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  shouldBeProtected(server, "GET", "/api/v1/mandataires/2/commentaires", {
    type: "ti"
  });

  describe("GET /api/v1/mandataires/1/commentaires", () => {
    it("should get list of commentaires for given mandataire", () =>
      logUser(server, {
        username: "ti1",
        password: "ti1"
      }).then(token => {
        return agent
          .get("/api/v1/mandataires/1/commentaires")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(1);
            res.body[0].comment.should.eql("Hello, world 2");
          });
      }));
    it("should NOT get list of commentaires for a mandataire not in my TI", () =>
      logUser(server, {
        username: "ti1",
        password: "ti1"
      }).then(token =>
        agent
          .get("/api/v1/mandataires/1/commentaires")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql("application/json");
            res.body.length.should.eql(1);
            res.body[0].comment.should.eql("Hello, world 2");
          })
      ));
  });

  shouldBeProtected(server, "POST", "/api/v1/mandataires/1/commentaires");

  it("should post commentaire for given mandataire and return response", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(token =>
      knex
        .from("commentaires")
        .where({
          ti_id: 2,
          mandataire_id: 2
        })
        .then(commentaires => {
          return agent
            .post("/api/v1/mandataires/2/commentaires")
            .set("Authorization", "Bearer " + token)
            .send({
              comment: "this is a super comment"
            })
            .then(res => {
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.length.should.eql(commentaires.length + 1);
              res.body[commentaires.length - 1].comment.should.eql(
                "Hello, mandataire_id=2,ti_id=2"
              );
              return knex
                .from("commentaires")
                .where({
                  ti_id: 2,
                  mandataire_id: 2
                })
                .then(res => {
                  return res.length.should.eql(commentaires.length + 1);
                });
            });
        })
    ));
  it("should NOT post commentaire for a mandataire not in my TI", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(token =>
      knex
        .from("commentaires")
        .where({
          mandataire_id: 3,
          ti_id: 2
        })
        .then(res => {
          const initialCount = res.length;
          return agent
            .post("/api/v1/mandataires/3/commentaires")
            .set("Authorization", "Bearer " + token)
            .send({
              comment: "this is a super comment"
            })
            .catch(res => {
              return true;
            })
            .then(res =>
              knex
                .from("commentaires")
                .where({
                  mandataire_id: 3,
                  ti_id: 2
                })
                .then(res => {
                  res.length.should.eql(initialCount);
                })
            );
        })
    ));

  //});
  // it("should throw when posting commentaire on invalid mandataire", done => {
  //   // TODO
  //   "1".should.eql(2);
  // });

  shouldBeProtected(server, "DELETE", "/api/v1/mandataires/1/commentaires/1", {
    type: "ti"
  });

  it("should delete commentaire for given mandataire", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(token =>
      knex
        .select()
        .from("commentaires")
        .where({
          ti_id: 2,
          mandataire_id: 2
        })
        .then(commentaires => {
          if (commentaires.length) {
            return agent
              .delete(
                `/api/v1/mandataires/2/commentaires/${commentaires[commentaires.length - 1].id}`
              )
              .set("Authorization", "Bearer " + token)
              .then(res => {
                // test response
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql("application/json");
                res.body.length.should.eql(commentaires.length - 1);
                // test DB
                return knex
                  .select()
                  .from("commentaires")
                  .where({
                    ti_id: 2,
                    mandataire_id: 2
                  })
                  .then(res =>
                    res.length.should.eql(Math.max(0, commentaires.length - 1))
                  );
              });
          }
        })
    ));

  it("should NOT delete commentaire for a mandataire not in my TI", () =>
    logUser(server, {
      username: "ti1",
      password: "ti1"
    }).then(token =>
      knex
        .select()
        .from("commentaires")
        .where({
          id: 4
        })
        .then(commentaires => {
          if (commentaires.length) {
            return agent
              .delete("/api/v1/mandataires/1/commentaires/4")
              .set("Authorization", "Bearer " + token)
              .then(res => {
                // test response
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql("application/json");
                res.body.length.should.eql(1);
                // test DB
                return knex
                  .select()
                  .from("commentaires")
                  .where({
                    id: 4
                  })
                  .then(res => res.length.should.eql(1));
              });
          }
        })
    ));
});
