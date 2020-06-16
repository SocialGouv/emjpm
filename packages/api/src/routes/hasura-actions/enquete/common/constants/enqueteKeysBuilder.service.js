function buildKeys(byKey) {
  return {
    byKey,
    byValue: revertMapKeysValues(byKey),
    keys: Object.keys(byKey),
    values: Object.values(byKey),
  };
}

function revertMapKeysValues(mapByKey) {
  return Object.keys(mapByKey).reduce((map, key) => {
    const value = mapByKey[key];
    map[value] = key;
    return map;
  }, {});
}

const enqueteKeysBuilder = {
  buildKeys,
};

module.exports = enqueteKeysBuilder;
