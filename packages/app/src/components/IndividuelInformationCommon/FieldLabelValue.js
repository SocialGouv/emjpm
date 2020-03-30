import { Field } from "@emjpm/ui";
import React from "react";
import { Text } from "rebass";

import { content } from "./style";

const FieldLabelValue = ({ label, value }) => (
  <Field>
    <Text lineHeight="1.5" color="textSecondary">
      {label}
    </Text>
    <Text lineHeight="1.5" sx={content}>
      {value}
    </Text>
  </Field>
);

export { FieldLabelValue };
