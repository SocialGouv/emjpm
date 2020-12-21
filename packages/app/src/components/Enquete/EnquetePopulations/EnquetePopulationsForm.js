import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { Heading3 } from "~/ui";
import { formatFormInput, parseFormInt } from "~/util";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePopulationsSchema as validationSchema } from "./enquetePopulationsSchema";
import { EnquetePopulationTrancheAgeField } from "./EnquetePopulationTrancheAgeField";

export function calculateTotal(firstProperty, secondProperty) {
  return Number(firstProperty || 0) + Number(secondProperty || 0);
}
function formToData(values) {
  return Object.keys(values).reduce((acc, key) => {
    const value = parseFormInt(values[key]);
    if (value !== null) {
      return {
        ...acc,
        [key]: value,
      };
    }
    return acc;
  }, {});
}
function dataToForm(data) {
  return {
    age_25_39_ans_femme: formatFormInput(data.age_25_39_ans_femme),
    age_25_39_ans_homme: formatFormInput(data.age_25_39_ans_homme),
    age_40_59_ans_femme: formatFormInput(data.age_40_59_ans_femme),
    age_40_59_ans_homme: formatFormInput(data.age_40_59_ans_homme),
    age_60_74_ans_femme: formatFormInput(data.age_60_74_ans_femme),
    age_60_74_ans_homme: formatFormInput(data.age_60_74_ans_homme),
    age_inf_25_ans_femme: formatFormInput(data.age_inf_25_ans_femme),
    age_inf_25_ans_homme: formatFormInput(data.age_inf_25_ans_homme),
    age_sup_75_ans_femme: formatFormInput(data.age_sup_75_ans_femme),
    age_sup_75_ans_homme: formatFormInput(data.age_sup_75_ans_homme),
    anciennete_1_3_ans: formatFormInput(data.anciennete_1_3_ans),
    anciennete_3_5_ans: formatFormInput(data.anciennete_3_5_ans),
    anciennete_5_10_ans: formatFormInput(data.anciennete_5_10_ans),
    anciennete_inf_1_an: formatFormInput(data.anciennete_inf_1_an),
    anciennete_sup_10_ans: formatFormInput(data.anciennete_sup_10_ans),
    autre_etablissement_personne_agee: formatFormInput(
      data.autre_etablissement_personne_agee
    ),
    autre_service: formatFormInput(data.autre_service),
    chrs: formatFormInput(data.chrs),
    ehpad: formatFormInput(data.ehpad),
    etablissement_personne_handicapee: formatFormInput(
      data.etablissement_personne_handicapee
    ),
    service_hospitalier_soins_longue_duree: formatFormInput(
      data.service_hospitalier_soins_longue_duree
    ),
    service_personne_handicapee: formatFormInput(
      data.service_personne_handicapee
    ),
    service_psychiatrique: formatFormInput(data.service_psychiatrique),
  };
}

export const EnquetePopulationsForm = (props) => {
  const {
    title,
    data = {},
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
  const { submitForm, handleChange, values, errors, submit } = enqueteForm;

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
        <HeadingTitle mb={1}>{"Populations en 2019"}</HeadingTitle>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>

      {title && <Heading3>{title}</Heading3>}

      <Text mt={4} mb={2} fontWeight="bold" color="titleSecondary">
        PAR TRANCHE D’ÂGE
      </Text>

      <EnquetePopulationTrancheAgeField
        enqueteForm={enqueteForm}
        enqueteContext={enqueteContext}
        label="Personnes de moins de 25 ans :"
        errors={errors}
        menFieldId="age_inf_25_ans_homme"
        womenFieldId="age_inf_25_ans_femme"
        handleChange={handleChange}
        values={values}
      />

      <EnquetePopulationTrancheAgeField
        enqueteForm={enqueteForm}
        enqueteContext={enqueteContext}
        errors={errors}
        label="Personnes entre 25 et 39 ans :"
        menFieldId="age_25_39_ans_homme"
        womenFieldId="age_25_39_ans_femme"
        handleChange={handleChange}
        values={values}
      />

      <EnquetePopulationTrancheAgeField
        enqueteForm={enqueteForm}
        enqueteContext={enqueteContext}
        errors={errors}
        label="Personnes entre 40 et 59 ans :"
        menFieldId="age_40_59_ans_homme"
        womenFieldId="age_40_59_ans_femme"
        handleChange={handleChange}
        values={values}
      />

      <EnquetePopulationTrancheAgeField
        enqueteForm={enqueteForm}
        enqueteContext={enqueteContext}
        errors={errors}
        label="Personnes entre 60 et 74 ans :"
        menFieldId="age_60_74_ans_homme"
        womenFieldId="age_60_74_ans_femme"
        handleChange={handleChange}
        values={values}
      />

      <EnquetePopulationTrancheAgeField
        enqueteForm={enqueteForm}
        enqueteContext={enqueteContext}
        errors={errors}
        label="Personnes de plus de 75 ans :"
        menFieldId="age_sup_75_ans_homme"
        womenFieldId="age_sup_75_ans_femme"
        handleChange={handleChange}
        values={values}
      />

      <Text mt={4} mb={2} fontWeight="bold" color="titleSecondary">
        PAR ANCIENNETÉ DE PRISE EN CHARGE
      </Text>

      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {"Depuis moins d’un an :"}
        </Label>
        <EnqueteFormInputField
          id="anciennete_inf_1_an"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {"De 1 à 3 ans :"}
        </Label>
        <EnqueteFormInputField
          id="anciennete_1_3_ans"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {"De 3 à 5 ans :"}
        </Label>
        <EnqueteFormInputField
          id="anciennete_3_5_ans"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {"De 5 à 10 ans :"}
        </Label>
        <EnqueteFormInputField
          id="anciennete_5_10_ans"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="210px">
          {"10 ans et plus :"}
        </Label>
        <EnqueteFormInputField
          id="anciennete_sup_10_ans"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Text mt={4} mb={2} fontWeight="bold" color="titleSecondary">
        {"PAR CATEGORIE D'ETABLISSEMENT"}
      </Text>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Etablissements pour personnes handicapées"}
        </Label>
        <EnqueteFormInputField
          id="etablissement_personne_handicapee"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Services pour personnes handicapées"}
        </Label>
        <EnqueteFormInputField
          id="service_personne_handicapee"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"EHPAD"}
        </Label>
        <EnqueteFormInputField
          id="ehpad"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Autres établissements pour personnes âgées"}
        </Label>
        <EnqueteFormInputField
          id="autre_etablissement_personne_agee"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Centre d'hébergement et de réinsertion sociale (CHRS)"}
        </Label>
        <EnqueteFormInputField
          id="chrs"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Service de soins de longue durée"}
        </Label>
        <EnqueteFormInputField
          id="service_hospitalier_soins_longue_duree"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Service psychiatrique"}
        </Label>
        <EnqueteFormInputField
          id="service_psychiatrique"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Flex alignItems="center">
        <Label mb={2} width="360px">
          {"Autre service"}
        </Label>
        <EnqueteFormInputField
          id="autre_service"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          size="small"
          type="number"
          min={0}
        >
          <Text mx={2}>personnes</Text>
        </EnqueteFormInputField>
      </Flex>

      <Box mt={4}>
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </Box>
  );
};

export default EnquetePopulationsForm;
