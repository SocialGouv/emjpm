import React from "react";
import { Box } from "rebass";

import { SidebarStyle } from "./style";

const CardStyle = isImportant => {
  return {
    bg: isImportant ? "primary" : "whiteGray",
    borderRadius: "6px",
    color: isImportant ? "white" : "text",
    mb: 2,
    p: 3
  };
};

const Sidebar = props => {
  return (
    <Box sx={SidebarStyle} {...props}>
      <Box sx={CardStyle(true)}>test</Box>
      <Box sx={CardStyle(false)}>test</Box>
    </Box>
  );
};

export { Sidebar };
