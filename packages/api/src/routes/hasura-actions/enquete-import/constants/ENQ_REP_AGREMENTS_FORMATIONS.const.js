const ENQ_REP_AGREMENTS_FORMATIONS = {
  NB_DEPARTEMENTS: buildKeys({
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5+": "Plus de 5"
  })
};

module.exports = {
  ENQ_REP_AGREMENTS_FORMATIONS
};

function buildKeys(byKey) {
  return {
    byKey,
    byValue: revertMapKeysValues(byKey)
  };
}

function revertMapKeysValues(mapByKey) {
  return Object.keys(mapByKey).reduce((map, key) => {
    const value = mapByKey[key];
    map[value] = key;
    return map;
  }, {});
}
