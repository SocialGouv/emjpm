process.env.NODE_ENV = "test";

const chai = require("chai");
const rewiremock = require("rewiremock").default;
const chaiHttp = require("chai-http");
const nodemailerMock = require("nodemailer-mock");

const { logUser } = require("./utils");

chai.should();
chai.use(chaiHttp);

const knex = require("../db/knex");

describe("routes : auth", () => {
  let server;

  before(() => {
    rewiremock("nodemailer").with(nodemailerMock);
    rewiremock.enable();
    server = require("../app");
  });

  beforeEach(() => {
    knex.raw("DELETE FROM 'knex_migrations_lock';");
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    nodemailerMock.mock.reset();
  });

  after(() => {
    rewiremock.disable();
    return knex.migrate.rollback();
  });

  describe("Login redirection", () => {
    it("should redirect individuel to /mandataires", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(res => {
          res.body.url.should.eql("/mandataires");
        }));
    it("should redirect prepose to /mandataires", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "kelly",
          password: "bryant123"
        })
        .then(res => {
          res.body.url.should.eql("/mandataires");
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
          res.body.success.should.eql(true);
          res.body.url.should.eql("/mandataires");
        }));
    it("should login a user when username have UpperCase and space", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: " jeRemY  ",
          password: "johnson123"
        })
        .then(res => {
          res.status.should.eql(200);
          res.redirects.length.should.eql(0);
          res.type.should.eql("application/json");
          res.body.success.should.eql(true);
          res.body.url.should.eql("/mandataires");
        }));
    it("should not login an inactive user", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "inactive",
          password: "inactive"
        })
        .then(res => {
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.success.should.eql(false);
        }));
    it("should NOT login an unregistered user", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "michael",
          password: "johnson123"
        })
        .then(res => {
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.success.should.eql(false);
        }));
    it("should NOT login a registered user with wrong password", () =>
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson1234"
        })
        .then(res => {
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.message.should.eql("User not found");
          res.body.success.should.eql(false);
        }));
  });

  describe("GET /auth/logout", () => {
    let agent;
    before(() => {
      agent = chai.request.agent(server);
    });

    it("should logout a user", () =>
      logUser(server).then(token =>
        agent
          .get("/auth/logout")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.eql(200);
            res.redirects.length.should.eql(0);
            res.type.should.eql("application/json");
            res.body.success.should.eql(true);
          })
          .catch(e => {
            console.log("e", e);
            throw new Error("should not fail");
          })
      ));

    // todo: ensure session is destroyed and cookie removed

    it("should return 200 if a user is not logged in", () =>
      chai
        .request(server)
        .get("/auth/logout")
        .then(res => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
        }));
  });

  describe("POST /auth/forgot_password", () => {
    it("should send a forgot password email with correct token on request", () =>
      chai
        .request(server)
        .post("/auth/forgot_password")
        .send({
          email: "ud@ud.com"
        })
        .then(async res => {
          // verify we send an email to "ud@ud.com" with token
          res.status.should.eql(200);
          const sentMail = nodemailerMock.mock.sentMail();
          sentMail.length.should.eql(1);
          sentMail[0].to.should.eql("ud@ud.com");
          sentMail[0].subject.should.eql("Nouveau mot de passe pour e-MJPM");
          const token = await knex
            .select("reset_password_token")
            .from("users")
            .innerJoin("mandataires", "users.id", "mandataires.user_id")
            .where("email", "ud@ud.com")
            .first();
          sentMail[0].html.should.contain(
            `reset-password?token=${token.reset_password_token}`
          );
        })
        .catch(e => {
          console.log("e", e);
          throw new Error("should not fail");
        }));
    it("should fail when invalid user email", () =>
      chai
        .request(server)
        .post("/auth/forgot_password")
        .send({
          email: "udxxxx@ud.com"
        })
        .then(async res => {
          res.status.should.eql(500);
        }));
  });
  describe("POST /auth/reset-password", () => {
    it("should not reset a password when inputs do not match", () =>
      chai
        .request(server)
        .post("/auth/reset_password")
        .send({
          token: "LpWpzK4Jla9I87Aq",
          newPassword: "adad",
          verifyPassword: "tataadad"
        })
        .then(res => {
          res.status.should.eql(400);
        })
        .catch(e => {
          console.log("e", e);
          throw new Error("should not fail");
        }));
    it("should not reset a password when invalid token", () =>
      chai
        .request(server)
        .post("/auth/reset_password")
        .send({
          token: "aaaaa",
          newPassword: "adad",
          verifyPassword: "adad"
        })
        .then(res => {
          res.status.should.eql(401);
        })
        .catch(e => {
          console.log("e", e);
          //throw new Error("should not fail");
        }));
    it("should reset a password when input and token match", () =>
      chai
        .request(server)
        .post("/auth/reset_password")
        .send({
          token: "LpWpzK4Jla9I87Aq",
          newPassword: "adad",
          verifyPassword: "adad"
        })
        .then(res => {
          res.status.should.eql(200);
        })
        .catch(e => {
          console.log("e", e);
          throw new Error("should not fail");
        }));
    it("should empty user token+expiration on password restore", () =>
      chai
        .request(server)
        .post("/auth/reset_password")
        .send({
          token: "LpWpzK4Jla9I87Aq",
          newPassword: "adad",
          verifyPassword: "adad"
        })
        .then(async res => {
          res.status.should.eql(200);
          const token = await knex
            .select("reset_password_token")
            .from("users")
            .innerJoin("mandataires", "users.id", "mandataires.user_id")
            .where("email", "ud@ud.com")
            .first();
          chai.should().not.exist(token.reset_password_token);
        })
        .catch(e => {
          console.log("e", e);
          throw new Error("should not fail");
        }));
  });
});
