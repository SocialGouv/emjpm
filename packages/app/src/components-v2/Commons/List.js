import React from "react";
import { Box, Text } from "rebass";

const ListStyle = {
  fontSize: "1",
  mb: "1"
};

const ListTitleStyle = {
  color: "#555555",
  fontFamily: "Quicksand, sans-serif",
  fontSize: "2",
  fontWeight: "700",
  mb: "3"
};

const List = props => {
  return <Box as="ul" {...props} sx={ListStyle} />;
};

const ListItem = props => {
  return <Text as="li" {...props} sx={ListStyle} />;
};

const ListTitle = props => {
  return <Text as="li" {...props} sx={ListTitleStyle} />;
};

export { List, ListItem, ListTitle };
