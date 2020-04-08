import React from "react";
import { Text } from "rebass";

const FieldLabel = ({ label }) => {
  return (
    <Text lineHeight="1.5" color="textSecondary">
      {label}
    </Text>
  );
};

export { FieldLabel };
