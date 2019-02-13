// filter some object keys based on a whitelist
module.exports = (filters, whitelist = []) =>
  Object.keys(filters)
    .filter(key => whitelist.indexOf(key) > -1)
    .reduce(
      (res, key) => ({
        ...res,
        [key]: filters[key]
      }),
      {}
    );
