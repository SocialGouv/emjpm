import { Field } from "@emjpm/ui";
import React from "react";
import { Text } from "rebass";

import { FieldLabel } from "./FieldLabel";
import { content } from "./style";

const FieldLabelValue = ({ label, value }) => (
  <Field>
    <FieldLabel label={label} />
    <Text lineHeight="1.5" sx={content}>
      {value}
    </Text>
  </Field>
);

export { FieldLabelValue };
