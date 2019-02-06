//

const request = require("supertest");
const server = require("@socialgouv/api/app");

test("just logout", async () => {
  const response = await request(server)
    .get("/auth/logout");
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
