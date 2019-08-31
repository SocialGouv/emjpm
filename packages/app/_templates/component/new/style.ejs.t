---
to: src/presentationalComponents/<%= h.inflection.camelize(name) %>/style.js
---
const <%= h.inflection.camelize(name)%>Style = {
  bg: "blue"
};

export { <%= h.inflection.camelize(name)%>Style };
