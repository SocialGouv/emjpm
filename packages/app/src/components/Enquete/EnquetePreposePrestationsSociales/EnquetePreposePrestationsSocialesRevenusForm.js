import { Heading1, Heading3, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box, Flex, Text } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

function mapDataPropsToFormValues(data = {}) {
  const result = {};
  for (var i = 1; i <= 11; ++i) {
    const key = `tranche${i}`;
    result[key] = !data || !data[key] ? "" : data[key];
  }
  return result;
}

export const EnquetePreposePrestationsSocialesRevenusForm = props => {
  const { title, goToPrevPage, loading = false, data = {} } = props;

  const { handleSubmit, handleBlur, handleChange, values, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  console.log(values);

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
            value={values.tranche1}
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche2">Tranche 2</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            id="tranche2"
            name="tranche2"
            type="number"
            value={values.tranche2}
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche3">Tranche 3</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche3"
            name="tranche3"
            value={values.tranche3}
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche4">Tranche 4</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche4"
            name="tranche4"
            value={values.tranche4}
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche5">Tranche 5</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche5"
            name="tranche5"
            value={values.tranche5}
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche6">Tranche 6</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche6"
            name="tranche6"
            value={values.tranche6}
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche7">Tranche 7</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche7"
            name="tranche7"
            value={values.tranche7}
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche8">Tranche 8</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche8"
            name="tranche8"
            value={values.tranche8}
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche9">Tranche 9</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche9"
            name="tranche9"
            value={values.tranche9}
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche10">Tranche 10</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche10"
            name="tranche10"
            value={values.tranche10}
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche11">Tranche 11</Label>
          <Text>{"---"}</Text>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="tranche11"
            name="tranche11"
            value={values.tranche11}
          />
        </Box>
        <Box ml={3} flex={1 / 2} />
      </Flex>
      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnquetePreposePrestationsSocialesRevenusForm;
