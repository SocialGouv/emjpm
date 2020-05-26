export const urlQueryParser = {
  parseQueryValue,
  parseQueryValues
};

function parseQueryValues(names, { path, transform, defaultValue }) {
  const chunks = path.split("?");
  if (chunks.length > 1) {
    const query = chunks[1];
    const vars = query.split("&");
    return names.reduce((acc, name) => {
      const value = _parseQueryValueFromVars(name, {
        defaultValue,
        transform,
        vars
      });
      acc[name] = _transformValue(value, { defaultValue, transform });
      return acc;
    }, {});
  } else {
    return names.reduce((acc, name) => {
      acc[name] = defaultValue;
      return acc;
    }, {});
  }
}

function parseQueryValue(name, { path, transform, defaultValue }) {
  const chunks = path.split("?");
  let value;
  if (chunks.length > 1) {
    const query = chunks[1];
    const vars = query.split("&");
    value = _parseQueryValueFromVars(name, {
      vars
    });
  }
  return _transformValue(value, { defaultValue, transform });
}

function _parseQueryValueFromVars(name, { vars }) {
  return vars.reduce((acc, v) => {
    if (acc) {
      return acc;
    }
    const pair = v.split("=");
    if (decodeURIComponent(pair[0]) == name) {
      return decodeURIComponent(pair[1]);
    }
  }, undefined);
}

function _transformValue(value, { transform, defaultValue }) {
  if (value !== undefined) {
    if (transform) {
      return transform(value);
    }
    return value;
  }
  return defaultValue;
}
