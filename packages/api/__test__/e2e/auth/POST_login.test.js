//

const request = require("supertest");
const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

//

afterAll(async () => {
  await knex.destroy();
});

test.each`
  username       | password        | type            | url
  ${"jeremy"}    | ${"johnson123"} | ${"individuel"} | ${"/mandataires"}
  ${" jeRemY  "} | ${"johnson123"} | ${"individuel"} | ${"/mandataires"}
  ${"kelly"}     | ${"bryant123"}  | ${"prepose"}    | ${"/mandataires"}
  ${"service1"}  | ${"service1"}   | ${"service"}    | ${"/services"}
  ${"admin"}     | ${"admin"}      | ${"admin"}      | ${"/admin"}
  ${"ti1"}       | ${"ti1"}        | ${"ti"}         | ${"/tis"}
`("'$username' should login as $type", async ({ username, password, url }) => {
  const response = await request(server)
    .post("/auth/login")
    .send({
      username,
      password
    });
  expect(response.body).toMatchSnapshot({ token: expect.any(String), url });
  expect(response.status).toBe(200);
});

test.each`
  username      | password         | type
  ${"inactive"} | ${"inactive"}    | ${"an inactive user"}
  ${"michael"}  | ${"jackson"}     | ${"an unregistered user"}
  ${"jeremy"}   | ${"johnson1234"} | ${"a registered user with wrong password"}
`("'$username' not login $type", async ({ username, password }) => {
  const response = await request(server)
    .post("/auth/login")
    .send({
      username,
      password
    });
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(401);
});
