export const enqueteKeysBuilder = {
  buildKeys
};

function buildKeys(map) {
  return Object.keys(map).map(value => {
    const label = map[value];
    return {
      label,
      value
    };
  });
}
