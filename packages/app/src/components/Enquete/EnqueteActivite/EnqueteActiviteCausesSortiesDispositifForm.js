import { Heading1, Heading3 } from "@emjpm/ui";
import { Input, Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box, Flex } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

function mapDataPropsToFormValues(data) {
  return {
    sortiesMainLevee: data.sortiesMainLevee || "",
    sortiesDeces: data.sortiesDeces || "",
    sortiesMasp: data.sortiesMasp || ""
  };
}

function mapFormValuesToSubmit(data) {
  return {
    sortiesMainLevee: parseIntToSubmit(data.sortiesMainLevee),
    sortiesDeces: parseIntToSubmit(data.sortiesDeces),
    sortiesMasp: parseIntToSubmit(data.sortiesMasp)
  };

  function parseIntToSubmit(value) {
    return value ? parseInt(value) : undefined;
  }
}

export const EnqueteActiviteCausesSortiesDispositifForm = props => {
  const { goToPrevPage, data, loading = false } = props;
  const { handleSubmit, handleChange, values, errors, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(mapFormValuesToSubmit(values));
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Votre activité"}
        </Heading1>

        <Heading3>Causes de sorties du dispositif</Heading3>

        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>{`Main levée :`}</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="sortiesMainLevee"
              value={values.sortiesMainLevee}
              hasError={!!errors.sortiesMainLevee}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Décès :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="sortiesDeces"
              value={values.sortiesDeces}
              hasError={!!errors.sortiesDeces}
              onChange={handleChange}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>MASP :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="sortiesMasp"
              value={values.sortiesMasp}
              hasError={!!errors.sortiesMasp}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex flex={1 / 2} />
        </Flex>

        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </form>
    </Box>
  );
};

export default EnqueteActiviteCausesSortiesDispositifForm;
