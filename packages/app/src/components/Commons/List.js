import { Box, Text } from "rebass";

const ListStyle = {
  fontSize: "1",
  mb: "1",
};

const ListTitleStyle = {
  color: "#555555",
  fontFamily: "Quicksand, sans-serif",
  fontSize: "2",
  fontWeight: "700",
  mb: "3",
};

function List(props) {
  return <Box as="ul" {...props} sx={ListStyle} />;
}

function ListItem(props) {
  return <Text as="li" {...props} sx={ListStyle} />;
}

function ListTitle(props) {
  return (
    <Text
      as="li"
      {...props}
      sx={props.sx ? { ...ListTitleStyle, ...props.sx } : ListTitleStyle}
    />
  );
}

export { List, ListItem, ListTitle };
