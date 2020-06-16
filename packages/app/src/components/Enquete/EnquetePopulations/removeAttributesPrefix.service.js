export function removeAttributesPrefix(data, prefix) {
  return data
    ? Object.keys(data).reduce((acc, attr) => {
        const newAttr = attr.startsWith(prefix) ? attr.substring(prefix.length) : attr;
        acc[newAttr] = data[attr];
        return acc;
      }, {})
    : data;
}
