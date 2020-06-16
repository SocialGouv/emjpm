import { Heading1, Heading3 } from "@emjpm/ui";
import { Input, Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object(
  ["sorties_main_levee", "sorties_deces", "sorties_masp"].reduce((acc, attrName) => {
    acc[attrName] = yup.number().min(0).integer().nullable();
    return acc;
  }, [])
);
function dataToForm(data) {
  return {
    sortiesMainLevee: data.sortiesMainLevee || "",
    sortiesDeces: data.sortiesDeces || "",
    sortiesMasp: data.sortiesMasp || "",
  };
}

function formToData(data) {
  return {
    sortiesMainLevee: parseIntToSubmit(data.sortiesMainLevee),
    sortiesDeces: parseIntToSubmit(data.sortiesDeces),
    sortiesMasp: parseIntToSubmit(data.sortiesMasp),
  };

  function parseIntToSubmit(value) {
    return value ? parseInt(value) : undefined;
  }
}

export const EnqueteActiviteCausesSortiesDispositifForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const { submitForm, handleChange, values, errors, showError, submit } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });

  console.log("errors", errors);

  return (
    <Box>
      <form onSubmit={submitForm}>
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
              hasError={showError && !!errors.sortiesMainLevee}
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
              hasError={showError && !!errors.sortiesDeces}
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
              hasError={showError && !!errors.sortiesMasp}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex flex={1 / 2} />
        </Flex>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </Box>
  );
};

export default EnqueteActiviteCausesSortiesDispositifForm;
