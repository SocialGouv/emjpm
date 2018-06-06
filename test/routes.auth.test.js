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

describe("routes : auth", () => {
  before(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  );

  after(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("Login redirection", () => {
    it("should redirect individuel to /mandataires_index", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(res => {
          res.body.url.should.eql("/mandataires_index");
        }));
    it("should redirect prepose to /mandataires_index", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "kelly",
          password: "bryant123"
        })
        .then(res => {
          res.body.url.should.eql("/mandataires_index");
        }));
    it("should redirect ti to /tis", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "ti1",
          password: "ti1"
        })
        .then(res => {
          res.body.url.should.eql("/tis");
        }));
    it("should redirect service to /services", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "service1",
          password: "service1"
        })
        .then(res => {
          res.body.url.should.eql("/services");
        }));
    it("should redirect admin to /admin", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "admin",
          password: "admin"
        })
        .then(res => {
          res.body.url.should.eql("/admin");
        }));
  });

  describe("POST /auth/login", () => {
    it("should login a user", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(res => {
          res.status.should.eql(200);
          res.redirects.length.should.eql(0);
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          res.body.url.should.eql("/mandataires_index");
        }));
    it("should not login an inactive user", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "inactive",
          password: "inactive"
        })
        .then(() => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(401);
          res.response.type.should.eql("application/json");
          res.response.body.status.should.eql("User not found");
        }));
    it("should NOT login an unregistered user", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "michael",
          password: "johnson123"
        })
        .then(() => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(401);
          res.response.type.should.eql("application/json");
          res.response.body.status.should.eql("User not found");
        }));
    it("should NOT login a registered user with wrong password", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson1234"
        })
        .then(() => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(401);
          res.response.type.should.eql("application/json");
          res.response.body.status.should.eql("User not found");
        }));
  });

  describe("GET /auth/logout", () => {
    it("should logout a user", () =>
      logUser(server).then(agent =>
        agent
          .get("/auth/logout")
          .then(res => {
            res.status.should.eql(200);
            res.redirects.length.should.eql(0);
            res.type.should.eql("application/json");
            res.body.status.should.eql("success");
          })
          .catch(e => {
            console.log("e", e);
            throw new Error("should not fail");
          })
      ));

    // todo: ensure session is destroyed and cookie removed

    it("should throw an error if a user is not logged in", () =>
      chai
        .request(server)
        .get("/auth/logout")
        .then(() => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(401);
          res.response.type.should.eql("application/json");
          res.response.body.status.should.eql("Please log in");
        }));
  });
});
