/*

knex + postgresql serial sequence update for all tables

problem:
  - if you TRUNCATE TABLE -> be sure to also RESTART IDENTITY
  - if not, PostgreSQL has wrong indexes for some reason

solution:
  - use this helper to reset sequences before starting your scripts

inspired from https://gist.github.com/brunocascio/faf049900b61d20661514be01d74a01f

addons :

 - detect primary keys
 - knex + promises only

*/

const knex = require("./knex");

// return some table PK
const getPrimaryKey = (trx, table_name) =>
  trx
    .select("information_schema.key_column_usage.column_name")
    .from("information_schema.key_column_usage")
    .leftJoin(
      "information_schema.table_constraints",
      "information_schema.table_constraints.constraint_name",
      "information_schema.key_column_usage.constraint_name"
    )
    .where({
      "information_schema.table_constraints.table_name": table_name,
      "information_schema.table_constraints.constraint_type": "PRIMARY KEY"
    })
    .then(r => r && r[0] && r[0].column_name);

// reset all tables indexes
const reset = () =>
  knex
    .transaction(trx =>
      trx
        .table("information_schema.tables")
        .select("table_name")
        .where({ table_schema: "public" })
        .then(tables =>
          Promise.all(
            tables.map(table =>
              getPrimaryKey(trx, table.table_name).then(
                pk =>
                  pk
                    ? trx.raw(
                        `SELECT
                          setval(pg_get_serial_sequence(':table_name:', :pk),
                          coalesce(max(:pk:), 0) + 1, false)
                         FROM :table_name:;`,
                        {
                          table_name: table.table_name,
                          pk
                        }
                      )
                    : Promise.resolve(/* when no primary key, just succeed */)
              )
            )
          )
        )
    )
    .then(inserts => {
      console.log(
        inserts && `serial_sequence: ${inserts.length} sequences resetted`
      );
    })
    .catch(error => {
      console.error(error);
    });

module.exports = reset;
