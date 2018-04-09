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

describe("routes : auth", () => {
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

  // describe("POST /auth/register", () => {
  //   it("should register a new user", done => {
  //     chai
  //       .request(server)
  //       .post("/auth/register")
  //       .send({
  //         username: "michael",
  //         password: "herman"
  //       })
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(200);
  //         res.type.should.eql("application/json");
  //         res.body.status.should.eql("success");
  //         done();
  //       });
  //   });
  //   it("should throw an error if the username is < 6 characters", done => {
  //     chai
  //       .request(server)
  //       .post("/auth/register")
  //       .send({
  //         username: "six",
  //         password: "herman"
  //       })
  //       .end((err, res) => {
  //         should.exist(err);
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(400);
  //         res.type.should.eql("application/json");
  //         res.body.status.should.eql("Username must be longer than 6 characters");
  //         done();
  //       });
  //   });
  //   it("should throw an error if the password is < 6 characters", done => {
  //     chai
  //       .request(server)
  //       .post("/auth/register")
  //       .send({
  //         username: "michael",
  //         password: "six"
  //       })
  //       .end((err, res) => {
  //         should.exist(err);
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(400);
  //         res.type.should.eql("application/json");
  //         res.body.status.should.eql("Password must be longer than 6 characters");
  //         done();
  //       });
  //   });
  // });

  describe("POST /auth/login", () => {
    it("should login a user", done => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.status.should.eql("success");
          done();
        });
    });
    it("should not login an unregistered user", done => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "michael",
          password: "johnson123"
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.status.should.eql("User not found");
          done();
        });
    });
    it("should not login a registered user with wrong password", done => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson1234"
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.status.should.eql("User not found");
          done();
        });
    });
  });

  describe("GET /auth/logout", () => {
    it("should logout a user", done => {
      var agent = chai.request.agent(server);
      agent
        .post("/auth/login")
        .send({
          username: "jeremy",
          password: "johnson123"
        })
        .then(function(res) {
          // expect(res).to.have.cookie('sessionid');
          // The `agent` now has the sessionid cookie saved, and will send it
          // back to the server in the next request:
          return agent
            .get("/auth/logout")
            .then(function(res) {
              res.redirects.length.should.eql(0);
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.status.should.eql("success");
              done();
            })
            .catch(err => {
              throw new Error("should not fail");
            });

          // todo: ensure session is destroyed and cookie removed
        });
    });

    it("should throw an error if a user is not logged in", done => {
      chai
        .request(server)
        .get("/auth/logout")
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql("application/json");
          res.body.status.should.eql("Please log in");
          done();
        });
    });
  });
});
