---
to: src/components-v2/<%= h.inflection.camelize(name) %>/style.js
---
const <%= h.inflection.camelize(name)%>Style = {
  bg: "blue"
};

export { <%= h.inflection.camelize(name)%>Style };
