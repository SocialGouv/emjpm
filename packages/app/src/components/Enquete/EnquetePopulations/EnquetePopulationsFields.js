import { InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";
import styles from "./style";

export function calculateTotal(firstProperty, secondProperty) {
  return Number(firstProperty || 0) + Number(secondProperty || 0);
}

export const EnquetePopulationTrancheAgeField = props => {
  const { values, errors, menFieldId, womenFieldId, label, handleChange, showError } = props;
  const men = { value: values[menFieldId], error: errors[menFieldId], field: menFieldId };
  const women = { value: values[womenFieldId], error: errors[womenFieldId], field: womenFieldId };

  return (
    <Fragment>
      <Box mb={2}>
        <InlineError showError={showError} message={men.error} fieldId={men.field} />
        {!men.error && (
          <InlineError showError={showError} message={women.error} fieldId={women.field} />
        )}
      </Box>
      <Flex mb={4} alignItems="center">
        <Label width="210px">{label}</Label>
        <SmallInput
          mx={1}
          min={0}
          id={women.field}
          name={women.field}
          value={women.value}
          hasError={!!women.error}
          onChange={handleChange}
          type="number"
        />
        <Label width="auto">femmes et</Label>
        <SmallInput
          mx={1}
          min={0}
          placeholder=""
          id={men.field}
          name={men.field}
          value={men.value}
          hasError={!!men.error}
          onChange={handleChange}
          type="number"
        />
        <Box sx={styles.label}>
          {"hommes, soit "}
          <Text sx={styles.strongLabel}>{calculateTotal(men.value, women.value)}</Text>
          {" personnes."}
        </Box>
      </Flex>
    </Fragment>
  );
};
