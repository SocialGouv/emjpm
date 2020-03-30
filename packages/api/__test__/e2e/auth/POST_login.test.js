//

const request = require("supertest");

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test.each`
  username      | password        | type
  ${"jeremy"}   | ${"johnson123"} | ${"individuel"}
  ${"kelly"}    | ${"bryant123"}  | ${"prepose"}
  ${"service1"} | ${"service1"}   | ${"service"}
  ${"admin"}    | ${"admin"}      | ${"admin"}
  ${"ti1"}      | ${"ti1"}        | ${"ti"}
`("'$username' should login as $type", async ({ username, password }) => {
  const response = await request(server)
    .post("/api/auth/login")
    .send({
      username,
      password
    });
  expect(response.body).toMatchSnapshot({ token: expect.any(String) });
  expect(response.status).toBe(200);
});

test.each`
  username       | password         | type
  ${"inactive"}  | ${"inactive"}    | ${"an inactive user"}
  ${" jeRemY  "} | ${"johnson123"}  | ${"individuel"}
  ${"michael"}   | ${"jackson"}     | ${"an unregistered user"}
  ${"jeremy"}    | ${"johnson1234"} | ${"a registered user with wrong password"}
`("'$username' not login $type", async ({ username, password }) => {
  const response = await request(server)
    .post("/api/auth/login")
    .send({
      username,
      password
    });
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(401);
});
