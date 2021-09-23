import { Label } from "@rebass/forms";
import { useMemo } from "react";
import { Box, Text } from "rebass";
import { RequiredAsterisk } from "~/components";

const FieldLabel = ({}) => {};
export function EnqueteFormFieldLabel({
  id,
  label,
  text,
  enqueteForm,
  required,
  children,
}) {
  const { validationSchema, readOnly } = enqueteForm;

  const isRequired = useMemo(() => {
    if (required) {
      return true;
    }
    const fieldValidation = validationSchema.fields[id];
    return (
      fieldValidation &&
      fieldValidation._exclusive &&
      fieldValidation._exclusive.required
    );
  }, [id, required, validationSchema.fields]);

  return (
    <>
      {label && (
        <Label sx={FieldLabel({})} mb={"5px"} htmlFor={id}>
          {label}
          {isRequired && !readOnly && <RequiredAsterisk />}
        </Label>
      )}
      {text && (
        <Text sx={FieldLabel({})} mb={"5px"}>
          {text}
          {isRequired && !label && !readOnly && <RequiredAsterisk />}
        </Text>
      )}
      {children ? (
        <Box sx={FieldLabel({})}>
          {children}
          {isRequired && !label && !text && !readOnly && <RequiredAsterisk />}
        </Box>
      ) : null}
    </>
  );
}
