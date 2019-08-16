import React from "react";
import { Text, Box } from "rebass";

const ListStyle = {
  fontSize: "1",
  mb: "1"
};

const ListTitleStyle = {
  fontWeight: "700",
  color: "#555555",
  fontSize: "2",
  fontFamily: "Quicksand, sans-serif",
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
