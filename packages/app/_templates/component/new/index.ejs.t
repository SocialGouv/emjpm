---
to: src/presentationalComponents/<%= h.inflection.camelize(name) %>/index.js
---
import { <%= h.inflection.camelize(name) %> } from "./<%= h.inflection.camelize(name) %>";

export { <%= h.inflection.camelize(name) %> };
