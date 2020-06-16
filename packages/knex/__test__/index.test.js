//

const { knex } = global;

// NOTE(douglasduteil): allow knex tests to take up to 25s
// Slow machine might have difficulties running those test under 5s.
jest.setTimeout(25 * 1000);

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test("should list all tables", async () => {
  const query = `
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = current_schema() AND table_catalog = ?
  `;
  const results = await knex.raw(query, [knex.client.database()]);
  expect(results.rows.map((row) => row.table_name).sort()).toMatchSnapshot();
});

// !
// ! HACK(douglasduteil): use the "all table" snapshot to get the tables name
// ! As I didn't find how to make jest "top await" for the table list to
// ! arrive, I'm using the generated snapshot list above.
// ! This is very hacky but the good part is :
// ! What ever happen in database tables will affect both tests.
// ! The tests above and below will fail as they are "naturally" linked.
// !
// ! @lionelB calls this : **snapshotception**
// !
const tables = JSON.parse(
  require("./__snapshots__/index.test.js.snap")
    ["should list all tables 1"] // the name of the snapshot above.
    .trim() // 'cause we need to this this snapshot
    .slice(6) // 'cause it's definitely an "Array ". That's makes 6 characters
    .replace(",\n]", "]") // 'cause snapshots have trailing comas and JSON.parse doesn't like it.
);

test.each(tables.map((name) => [name]))("%s table schema", async (name) => {
  expect(await knex.table(name).columnInfo()).toMatchSnapshot();
});

test("should rollback to nothing", async () => {
  await knex.migrate.rollback();

  const query = `
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = current_schema() AND table_catalog = ?
  `;
  const results = await knex.raw(query, [knex.client.database()]);
  expect(results.rows.map((row) => row.table_name).sort())
    .toMatchInlineSnapshot(`
Array [
  "knex_migrations_v2",
  "knex_migrations_v2_lock",
]
`);
});
