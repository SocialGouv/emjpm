---
to: src/components-v2/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>.js
---
import React from "react";
import { Box } from "rebass";

import { <%= h.capitalize(name) %>Style } from "./style";

const <%= h.capitalize(name) %> = props => {
  return (
    <Box sx={<%= h.capitalize(name) %>Style} {...props}>
      <%= h.capitalize(name) %>
    </Box>
  );
};

export { <%= h.capitalize(name) %> };
