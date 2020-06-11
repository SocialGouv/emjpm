import { Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

const validationSchema = yup.object().shape({
  tranche1: yup.number().min(0)
});

function mapDataPropsToFormValues(data = {}) {
  const result = {};
  for (var i = 1; i <= 11; ++i) {
    const key = `tranche${i}`;
    result[key] = !data || !data[key] ? "" : data[key];
  }
  return result;
}

export const EnquetePreposePrestationsSocialesRevenusForm = props => {
  const { title, goToPrevPage, loading = false, data = {}, step } = props;

  const {
    handleSubmit,
    errors,
    handleBlur,
    handleChange,
    submitCount,
    values,
    setValues
  } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema,
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Revenus / Prestation sociales"}
      </Heading1>
      <Heading3 mb={4}>{title}</Heading3>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche1">Tranche 1</Label>
          <Text>{"Revenus annuels inférieurs ou égaux à l'AAH"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="tranche1"
            id="tranche1"
            type="number"
            min={0}
            value={values.tranche1}
          />
          <InlineError showError={showError} message={errors.tranche1} fieldId="tranche1" />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche2">Tranche 2</Label>
          <Text>{"supérieurs à l'AAH et inférieurs au SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            id="tranche2"
            name="tranche2"
            type="number"
            min={0}
            value={values.tranche2}
          />
          <InlineError showError={showError} message={errors.tranche2} fieldId="tranche2" />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche3">Tranche 3</Label>
          <Text>{"entre un SMIC brut et 1,2 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche3"
            name="tranche3"
            min={0}
            value={values.tranche3}
          />
          <InlineError showError={showError} message={errors.tranche3} fieldId="tranche3" />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche4">Tranche 4</Label>
          <Text>{"entre 1,2 SMIC brut et 1,4 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche4"
            name="tranche4"
            min={0}
            value={values.tranche4}
          />
          <InlineError showError={showError} message={errors.tranche4} fieldId="tranche4" />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche5">Tranche 5</Label>
          <Text>{"entre 1,4 SMIC brut et 1,6 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche5"
            name="tranche5"
            min={0}
            value={values.tranche5}
          />
          <InlineError showError={showError} message={errors.tranche5} fieldId="tranche5" />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche6">Tranche 6</Label>
          <Text>{"entre 1,6 SMIC brut et 1,8 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche6"
            name="tranche6"
            min={0}
            value={values.tranche6}
          />
          <InlineError showError={showError} message={errors.tranche6} fieldId="tranche6" />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche7">Tranche 7</Label>
          <Text>{"entre 1,8 SMIC brut et 2 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche7"
            name="tranche7"
            min={0}
            value={values.tranche7}
          />
          <InlineError showError={showError} message={errors.tranche7} fieldId="tranche7" />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche8">Tranche 8</Label>
          <Text>{"entre 2 SMIC brut et 2,5 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche8"
            name="tranche8"
            min={0}
            value={values.tranche8}
          />
          <InlineError showError={showError} message={errors.tranche8} fieldId="tranche8" />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche9">Tranche 9</Label>
          <Text>{"entre 2,5 SMIC brut et 4 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche9"
            name="tranche9"
            min={0}
            value={values.tranche9}
          />
          <InlineError showError={showError} message={errors.tranche9} fieldId="tranche9" />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche10">Tranche 10</Label>
          <Text>{"entre 4 SMIC brut et 6 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche10"
            name="tranche10"
            min={0}
            value={values.tranche10}
          />
          <InlineError showError={showError} message={errors.tranche10} fieldId="tranche10" />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche11">Tranche 11</Label>
          <Text>{"supérieurs à 6 SMIC brut"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche11"
            name="tranche11"
            min={0}
            value={values.tranche11}
          />
          <InlineError showError={showError} message={errors.tranche11} fieldId="tranche11" />
        </Box>
        <Box ml={3} flex={1 / 2} />
      </Flex>
      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnquetePreposePrestationsSocialesRevenusForm;
