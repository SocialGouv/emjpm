export const enqueteKeysBuilder = {
  buildKeys
};

function buildKeys(map) {
  const byKey = Object.keys(map).map(value => {
    const label = map[value];
    return {
      label,
      value
    };
  });
  return {
    byKey,
    keys: Object.keys(map)
  };
}
