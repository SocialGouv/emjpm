---
to: src/components/<%= h.inflection.camelize(name) %>/<%= h.inflection.camelize(name) %>.js
---
import React from "react";
import { Box } from "rebass";

import { <%= h.inflection.camelize(name) %>Style } from "./style";

const <%= h.inflection.camelize(name) %> = props => {
  return (
    <Box sx={<%= h.inflection.camelize(name) %>Style} {...props}>
      <%= h.inflection.camelize(name) %>
    </Box>
  );
};

export { <%= h.inflection.camelize(name) %> };
