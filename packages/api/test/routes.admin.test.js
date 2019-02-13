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

const agent = chai.request.agent(server);

describe("routes : /admin", () => {
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

  describe("/security", () => {
    shouldBeProtected(server, "GET", "/api/v1/admin/mandataires", {
      type: "admin"
    });
    shouldBeProtected(server, "PUT", "/api/v1/admin/user/1", {
      type: "admin"
    });
  });
  describe("/mandataires", () => {
    it("should return list of mandataires", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .get("/api/v1/admin/mandataires")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.equal(200);
            res.body.length.should.equal(4);
          })
      ));

    it("should filter list of mandataires", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .get("/api/v1/admin/mandataires?users.active=false")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.equal(200);
            res.body.length.should.equal(1);
          })
      ));

    it("should NOT filter list of mandataires by password", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .get("/api/v1/admin/mandataires?users.password=abc")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.equal(200);
            res.body.length.should.equal(4);
          })
      ));
  });

  describe("/tis", () => {
    it("should return list of users by tis", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .get("/api/v1/admin/tis")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.equal(200);
            res.body.length.should.equal(2);
            res.body[0].id.should.equal(5);
            res.body[1].id.should.equal(32);
          })
      ));
    it("should filter list of user Ti", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .get("/api/v1/admin/tis?users.active=false")
          .set("Authorization", "Bearer " + token)
          .then(res => {
            res.status.should.equal(200);
            res.body.length.should.equal(1);
            res.body[0].id.should.equal(32);
          })
      ));
  });

  describe("PUT /user", () => {
    it("should update user active state", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .put("/api/v1/admin/user/1")
          .set("Authorization", "Bearer " + token)
          .send({
            active: false
          })
          .then(res => {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            return knex
              .table("users")
              .where("id", 1)
              .select("active")
              .first()
              .then(({ active }) => {
                return active.should.equal(false);
              });
          })
      ));

    it("should update only active state", () =>
      logUser(server, {
        username: "admin",
        password: "admin"
      }).then(token =>
        agent
          .put("/api/v1/admin/user/1")
          .set("Authorization", "Bearer " + token)
          .send({
            active: false,
            username: "BIM",
            password: "BAM",
            type: "BOUM"
          })
          .then(res => {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            return knex
              .table("users")
              .where("id", 1)
              .first()
              .then(({ active, username, password, type }) => {
                active.should.equal(false);
                username.should.not.equal("BIM");
                password.should.not.equal("BAM");
                type.should.not.equal("BOUM");
              });
          })
      ));
  });
});
