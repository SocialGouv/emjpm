import React from "react";
import { Box, Button, Text } from "rebass";

// TODO(remiroyc): create error box into emjpm-ui
const AdminUsersMesuresError = props => {
  const { title, message, onClick, buttonText } = props;

  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      color="white"
      variant="sideCard"
      p={2}
      alignItems="center"
      bg="error"
    >
      <Box>
        <Text fontWeight="bold">{title}</Text>
        <Text mt={1}>{message}</Text>
      </Box>
      <Button onClick={onClick}>{buttonText}</Button>
    </Box>
  );
};

export default AdminUsersMesuresError;
