//

const request = require("supertest");
const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

//

afterAll(async () => {
  await knex.destroy();
});

test.each`
  username       | password        | type
  ${"jeremy"}    | ${"johnson123"} | ${"individuel"}
  ${" jeRemY  "} | ${"johnson123"} | ${"individuel"}
  ${"kelly"}     | ${"bryant123"}  | ${"prepose"}
  ${"service1"}  | ${"service1"}   | ${"service"}
  ${"admin"}     | ${"admin"}      | ${"admin"}
  ${"ti1"}       | ${"ti1"}        | ${"ti"}
`("'$username' should login as $type", async ({ username, password }) => {
  const response = await request(server)
    .post("/auth/login")
    .send({
      username,
      password
    });
  expect(response.body).toMatchSnapshot({ token: expect.any(String) });
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
