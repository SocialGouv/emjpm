/* eslint no-param-reassign: ["error", { "props": false }] */
function revertMapKeysValues(mapByKey) {
  return Object.keys(mapByKey).reduce((map, key) => {
    const value = mapByKey[key];
    map[value] = key;
    return map;
  }, {});
}

function buildOptions(map) {
  return Object.keys(map).map((value) => {
    const label = map[value];
    return {
      label,
      value,
    };
  });
}

function buildKeys(byKey) {
  return {
    byKey,
    byValue: revertMapKeysValues(byKey),
    keys: Object.keys(byKey),
    options: buildOptions(byKey),
    values: Object.values(byKey),
  };
}

export { buildKeys };
