/* eslint no-param-reassign: ["error", { "props": false }] */
function revertMapKeysValues(mapByKey) {
  return Object.keys(mapByKey).reduce((map, key) => {
    const value = mapByKey[key];
    map[value] = key;
    return map;
  }, {});
}

function buildKeys(byKey) {
  return {
    byKey,
    byValue: revertMapKeysValues(byKey),
    keys: Object.keys(byKey),
    values: Object.values(byKey),
  };
}

const keysBuilder = {
  buildKeys,
};

module.exports = keysBuilder;
