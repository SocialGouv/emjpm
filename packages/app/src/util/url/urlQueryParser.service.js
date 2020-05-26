export const urlQueryParser = {
  parseQueryValue,
  parseQueryValues
};

function parseQueryValues(params, { path }) {
  const vars = _parsePath(path);

  return params.reduce((acc, param) => {
    const { name } = param;
    const value = _parseQueryValueFromVars(param, vars);
    acc[name] = _transformValue(value, param);
    return acc;
  }, {});
}

function parseQueryValue(param, { path }) {
  const vars = _parsePath(path);
  const value = _parseQueryValueFromVars(param, vars);
  return _transformValue(value, param);
}

function _parsePath(path) {
  if (path && path.length) {
    const chunks = path.split("?");
    if (chunks.length > 1) {
      const query = chunks[1];
      return query.split("&");
    }
  }
  return [];
}

function _parseQueryValueFromVars(param, vars) {
  const { name } = param;
  const value = vars.reduce((acc, v) => {
    if (acc) {
      return acc;
    }
    const pair = v.split("=");
    if (decodeURIComponent(pair[0]) == name) {
      return decodeURIComponent(pair[1]);
    }
  }, undefined);
  return value;
}

function _transformValue(value, param) {
  const { name, defaultValue, type } = param;
  let { transform } = param;
  if (!transform && type === "integer") {
    transform = transformToInteger;
  }
  if (value !== undefined) {
    if (transform) {
      const transformedValue = transform({ defaultValue, name, value });
      if (transformedValue) {
        return transformedValue;
      }
      return defaultValue;
    }
    return value;
  }
  return defaultValue;
}

const transformToInteger = ({ value }) => {
  const intValue = parseInt(value);
  if (!isNaN(intValue)) {
    return intValue;
  }
};
