const knexConnection = require("~/db/knex");
const { MutexLock } = require("~/models");

const UNIQUE_VIOLATION_ERROR = "23505";

async function acquireLock(key, { timeout = 0, knex = knexConnection } = {}) {
  await knex.raw(`DELETE FROM mutex_lock WHERE key = ? AND expiration < ?`, [
    key,
    new Date(),
  ]);

  let expiration = null;
  if (timeout) {
    expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + timeout);
  }

  let acquired;
  try {
    await MutexLock.query().insert({
      expiration,
      key,
    });
    acquired = true;
    console.log("lock acquired for '" + key + "'");
  } catch (e) {
    if (e.nativeError?.code === UNIQUE_VIOLATION_ERROR) {
      console.log("can't acquire lock for '" + key + "'");
    } else {
      console.error(e);
    }
    acquired = false;
  }
  return acquired;
}

async function releaseLock(key, { knex = knexConnection } = {}) {
  await knex.raw(`DELETE FROM mutex_lock WHERE key = ?`, [key]);
  console.log("lock released for '" + key + "'");
}

module.exports = { acquireLock, releaseLock };
