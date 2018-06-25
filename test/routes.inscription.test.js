process.env.NODE_ENV = "test";

const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : inscription", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("GET /api/v1/inscription/tis", () => {
    const expected = [
      { id: 1, nom: "ti arras", region: "Hauts-de-France" },
      { id: 2, nom: "ti paris", region: "Île-de-France" }
    ];
    it("should return list of tis by region", () =>
      chai
        .request(server)
        .get("/api/v1/inscription/tis")
        .then((res, req) => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          res.body.should.deep.eql(expected);
        }));
  });
});
