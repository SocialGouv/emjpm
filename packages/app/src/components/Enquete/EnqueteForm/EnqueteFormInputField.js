import { Field, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";

export const EnqueteFormInputField = ({
  id,
  label,
  size,
  type,
  min,
  max,
  enqueteContext,
  enqueteForm,
  children,
}) => {
  const enqueteReponseStatus = enqueteContext.enqueteReponse.status;
  const readOnly = enqueteReponseStatus !== "draft";

  const { formik, showError } = enqueteForm;
  const { handleChange, handleBlur, values, errors } = formik;

  if (!type) {
    type = "text";
  }

  return (
    <Field>
      {label && (
        <Label mb={1} htmlFor={id}>
          {label}
        </Label>
      )}

      <Flex alignItems="center">
        {size === "small" || size === "medium" ? (
          <SmallInput
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={values[id]}
            onChange={handleChange}
            hasError={!!errors.activite_personne_physique}
            type={type}
            min={min}
            max={max}
            minWidth={size === "small" ? "60px" : "180px"}
          />
        ) : (
          <Input
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={values[id]}
            onBlur={handleBlur}
            onChange={handleChange}
            hasError={showError && !!errors[id]}
            type={type}
            min={min}
            max={max}
          />
        )}
        <Box>{children}</Box>
      </Flex>

      <InlineError showError={showError} message={errors[id]} fieldId={id} />
    </Field>
  );
};

export default EnqueteFormInputField;
