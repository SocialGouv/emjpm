const { ProcessusStates } = require("~/models");
const { acquireLock, releaseLock } = require("~/utils/pg-mutex-lock");

async function processusIsRunning(type) {
  const processusState = await ProcessusStates.query()
    .where({
      result_state: null,
      type,
    })
    .andWhere("expire_date", ">", new Date())
    .limit(1);
  return processusState.length > 0;
}

async function startProcessus({
  expirationTimeInHour = 2,
  type,
  checkIsRunning = true,
  mutexLock = true,
}) {
  if (!type) {
    console.error("type is missing in startProcessus");
    return false;
  }

  if (mutexLock) {
    const lockAcquired = await acquireLock(type);
    if (!lockAcquired) {
      console.error("cannot acquire lock");
      return {
        alreadyInProgress: true,
      };
    }
    // console.log("lock acquired");
  }

  if (checkIsRunning) {
    const alreadyInProgress = await processusIsRunning(type);
    if (alreadyInProgress) {
      return {
        alreadyInProgress: true,
      };
    }
  }

  const now = new Date();
  const expireDate = new Date();
  expireDate.setHours(now.getHours() + expirationTimeInHour);
  const result = await ProcessusStates.query()
    .insert({
      expire_date: expireDate,
      start_date: now,
      type,
    })
    .returning("id");
  const { id } = result;
  return {
    alreadyInProgress: false,
    processusId: id,
  };
}

async function endProcessus({ success, id, mutexLock = true }) {
  const row = await ProcessusStates.query().findById(id);

  if (mutexLock) {
    await releaseLock(row.type);
  }

  await ProcessusStates.query()
    .findById(id)
    .update({
      end_date: new Date(),
      result_state: success ? "success" : "error",
    });
}

module.exports = { endProcessus, processusIsRunning, startProcessus };
