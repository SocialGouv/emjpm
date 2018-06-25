const chai = require("chai");
chai.should();

const logUser = (
  server,
  creds = {
    username: "jeremy",
    password: "johnson123"
  }
) => {
  const agent = chai.request.agent(server);
  return agent
    .post("/auth/login")
    .send(creds)
    .then(res => agent);
};

const shouldBeProtected = (server, method, url) =>
  it(`${method} ${url} should be protected`, () =>
    chai.request
      .agent(server)
      [method.toLowerCase()](url)
      .then(() => {
        throw Error("should not succeed");
      })
      .catch(res => {
        //console.log("res", res);
        res.status.should.eql(401);
      }));

module.exports = { logUser, shouldBeProtected };
