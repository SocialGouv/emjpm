---
to: src/components-v2/<%= h.inflection.camelize(name) %>/index.js
---
import { <%= h.inflection.camelize(name) %> } from "./<%= h.inflection.camelize(name) %>";

export { <%= h.inflection.camelize(name) %> };
