import { InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { Fragment, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { EnqueteFormInputField } from "../EnqueteForm";
import styles from "./style";

export function calculateTotal(firstProperty, secondProperty) {
  return Number(firstProperty || 0) + Number(secondProperty || 0);
}

export const EnquetePopulationTrancheAgeField = (props) => {
  const {
    values,
    errors,
    menFieldId,
    womenFieldId,
    label,
    showError,
    enqueteContext,
    enqueteForm,
  } = props;
  const men = { value: values[menFieldId], error: errors[menFieldId], field: menFieldId };
  const women = { value: values[womenFieldId], error: errors[womenFieldId], field: womenFieldId };
  const total = useMemo(() => calculateTotal(men.value, women.value), [men.value, women.value]);
  return (
    <Fragment>
      <Box>
        <InlineError showError={showError} message={men.error} fieldId={men.field} />
        {!men.error && (
          <InlineError showError={showError} message={women.error} fieldId={women.field} />
        )}
      </Box>
      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {label}
        </Label>
        <EnqueteFormInputField
          id={womenFieldId}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
          value={women.value}
          error={women.error}
        >
          <Text mx={2}>femmes et</Text>
        </EnqueteFormInputField>
        <EnqueteFormInputField
          id={womenFieldId}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
          value={men.value}
          error={men.error}
        >
          <Text ml={2}>
            hommes, soit <Box sx={styles.strongLabel}>{total}</Box> personnes
          </Text>
        </EnqueteFormInputField>
      </Flex>
    </Fragment>
  );
};
