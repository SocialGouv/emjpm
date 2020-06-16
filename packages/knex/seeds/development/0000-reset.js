exports.seed = (knex) => {
  // TRUNCATE AND RESET ALL DATA TABLES
  return knex("pg_catalog.pg_tables")
    .select("tablename")
    .where({ schemaname: "public" })
    .then((tables) =>
      tables
        .filter((t) => t.tablename.substring(0, 5) !== "knex_")
        .map((t) => t.tablename)
    )
    .then((tables) =>
      tables.map(
        (table) => `TRUNCATE TABLE public."${table}" RESTART IDENTITY CASCADE;`
      )
    )
    .then((sqls) => knex.raw(sqls.join("\n")));
};
