import { Label } from "@rebass/forms";
import React, { Fragment, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import {
  EnqueteFormFieldErrorMessage,
  EnqueteFormInputField,
} from "../EnqueteForm";
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
    enqueteContext,
    enqueteForm,
  } = props;
  const total = useMemo(
    () => calculateTotal(values[menFieldId], values[womenFieldId]),
    [values, menFieldId, womenFieldId]
  );
  return (
    <Fragment>
      <Box>
        <EnqueteFormFieldErrorMessage
          enqueteForm={enqueteForm}
          id={menFieldId}
        />
        {!errors[menFieldId] && (
          <EnqueteFormFieldErrorMessage
            enqueteForm={enqueteForm}
            id={womenFieldId}
          />
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
          disableErrorMessage={true} // message displayed above
        >
          <Text mx={2}>femmes et</Text>
        </EnqueteFormInputField>
        <EnqueteFormInputField
          id={menFieldId}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
          disableErrorMessage={true} // message displayed above
        >
          <Text ml={2}>
            hommes, soit <Box sx={styles.strongLabel}>{total}</Box> personnes
          </Text>
        </EnqueteFormInputField>
      </Flex>
    </Fragment>
  );
};
