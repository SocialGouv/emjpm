import { Heading1, Heading3 } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "~/lib/validationSchemas/yup";
import { parseFormFloat } from "~/util";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  tranche1: yup.number().min(0).nullable(),
  tranche10: yup.number().min(0).nullable(),
  tranche11: yup.number().min(0).nullable(),
  tranche2: yup.number().min(0).nullable(),
  tranche3: yup.number().min(0).nullable(),
  tranche4: yup.number().min(0).nullable(),
  tranche5: yup.number().min(0).nullable(),
  tranche6: yup.number().min(0).nullable(),
  tranche7: yup.number().min(0).nullable(),
  tranche8: yup.number().min(0).nullable(),
  tranche9: yup.number().min(0).nullable(),
});

function dataToForm(data = {}) {
  const result = {};
  for (var i = 1; i <= 11; ++i) {
    const key = `tranche${i}`;
    result[key] = !data || !data[key] ? "" : data[key];
  }
  return result;
}

function formToData(values) {
  const data = Object.keys(values).reduce((acc, attr) => {
    acc[attr] = parseFormFloat(values[attr]);
    return acc;
  }, {});
  return data;
}

export const EnquetePreposePrestationsSocialesRevenusForm = (props) => {
  const {
    title,
    data,
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <Box
      sx={{
        strong: {
          color: "primary",
        },
      }}
      as="form"
      onSubmit={submitForm}
    >
      <Box textAlign="center" mb={"50px"}>
        <Heading1 textAlign="center">
          {"Revenus / Prestations sociales en 2019"}
        </Heading1>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>
      <Heading3 mb={4}>{title}</Heading3>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche1">Tranche 1</Label>
          <EnqueteFormInputField
            id="tranche1"
            text="Revenus annuels inférieurs ou égaux à l'AAH"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche2">Tranche 2</Label>
          <EnqueteFormInputField
            id="tranche2"
            text="supérieurs à l'AAH et inférieurs au SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche3">Tranche 3</Label>
          <EnqueteFormInputField
            id="tranche3"
            text="entre un SMIC brut et 1,2 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche4">Tranche 4</Label>
          <EnqueteFormInputField
            id="tranche4"
            text="entre 1,2 SMIC brut et 1,4 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche5">Tranche 5</Label>
          <EnqueteFormInputField
            id="tranche5"
            text="entre 1,4 SMIC brut et 1,6 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche6">Tranche 6</Label>
          <EnqueteFormInputField
            id="tranche6"
            text="entre 1,6 SMIC brut et 1,8 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche7">Tranche 7</Label>
          <EnqueteFormInputField
            id="tranche7"
            text="entre 1,8 SMIC brut et 2 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche8">Tranche 8</Label>
          <EnqueteFormInputField
            id="tranche8"
            text="entre 2 SMIC brut et 2,5 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche9">Tranche 9</Label>
          <EnqueteFormInputField
            id="tranche9"
            text="entre 2,5 SMIC brut et 4 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2}>
          <Label htmlFor="tranche10">Tranche 10</Label>
          <EnqueteFormInputField
            id="tranche10"
            text="entre 4 SMIC brut et 6 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
      </Flex>

      <Flex justifyContent="start" mb={4}>
        <Box mr={3} flex={1 / 2}>
          <Label htmlFor="tranche11">Tranche 11</Label>
          <EnqueteFormInputField
            id="tranche11"
            text="supérieurs à 6 SMIC brut"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        </Box>
        <Box ml={3} flex={1 / 2} />
      </Flex>
      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </Box>
  );
};

export default EnquetePreposePrestationsSocialesRevenusForm;
