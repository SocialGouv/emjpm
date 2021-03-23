const { createHash } = require("crypto");

const knexConnection = require("~/db/knex");

async function acquireLock(
  key,
  { acquireTimeout = 5, lockTimeout = "600s", knex = knexConnection } = {}
) {
  const [classid, objid] = strToKey(key);

  const timeoutNs = acquireTimeout * 1000;
  const time = +new Date();
  while (+new Date() - time < timeoutNs) {
    if (lockTimeout) {
      const { rows } = await knex.raw(
        `
        SELECT
            CASE count(*) WHEN 0 THEN (SELECT pg_try_advisory_lock_with_timeout(?, ?, ?))
                        ELSE FALSE
            END as pg_try_advisory_lock
        FROM
            pg_locks
        WHERE
            pid = (
                SELECT
                    pg_backend_pid()
                )
            AND locktype = 'advisory'
            AND classid = ? AND objid = ?;
      `,
        [classid, objid, lockTimeout, classid, objid]
      );

      if (rows[0].pg_try_advisory_lock == true) return true;
    } else {
      const { rows } = await knex.raw(
        `
        SELECT
            CASE count(*) WHEN 0 THEN (SELECT pg_try_advisory_lock(?, ?))
                        ELSE FALSE
            END as pg_try_advisory_lock
        FROM
            pg_locks
        WHERE
            pid = (
                SELECT
                    pg_backend_pid()
                )
            AND locktype = 'advisory'
            AND classid = ? AND objid = ?;
      `,
        [classid, objid, classid, objid]
      );
      if (rows[0].pg_try_advisory_lock == true) return true;
    }

    await sleep(100);
  }

  return false;
}

async function releaseLock(key, { knex = knexConnection } = {}) {
  const [classid, objid] = strToKey(key);

  const { rows } = await knex.raw("SELECT pg_advisory_unlock(?, ?);", [
    classid,
    objid,
  ]);

  return rows[0].pg_advisory_unlock;
}

function strToKey(str) {
  const buf = createHash("sha256").update(str).digest();
  return [buf.readInt32LE(0), buf.readInt32LE(4)];
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = { acquireLock, releaseLock };
