---
to: packages/<%= package %>/src/<%= name.charAt(0).toUpperCase() + name.slice(1) %>/index.js
---
import { <%= h.inflection.camelize(name) %> } from './<%= h.inflection.camelize(name) %>';

export { <%= h.inflection.camelize(name) %> };


