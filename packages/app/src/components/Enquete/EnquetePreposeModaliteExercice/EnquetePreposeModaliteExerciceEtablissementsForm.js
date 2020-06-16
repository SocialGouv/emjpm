/* eslint-disable no-unused-vars */
import { Button, Card, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Checkbox, Label } from "@rebass/forms";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { findOption } from "../../../util/option/OptionUtil";
import { YesNoComboBox } from "../../Commons";
import { SmallInput } from "../../Commons/SmallInput";
import { STATUTS, TYPES } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  actions_information_tuteurs_familiaux: yup.boolean().required(),
  etablissements: yup.array().of(
    yup.object().shape({
      finess: yup.string().required(),
      nombre_journees_hospitalisation: yup.number().min(0).required(),
      nombre_lits: yup.number().min(0).required(),
      raison_sociale: yup.string().required(),
      statut: yup.string().required(),
      type: yup.string().required(),
      nombre_journees_esms: yup.number().min(0).required(),
      nombre_mesures: yup.number().min(0).required(),
    })
  ),
});

function dataToForm(data) {
  const result = {
    actions_information_tuteurs_familiaux: data.actions_information_tuteurs_familiaux || false,
  };

  if (!data.nombre_lits_journee_hospitalisation) {
    return {
      ...result,
      etablissements: [
        {
          finess: "",
          nombre_journees_hospitalisation: "",
          nombre_lits: "",
          raison_sociale: "",
          statut: "",
          type: "",
          nombre_journees_esms: "",
          nombre_mesures: "",
        },
      ],
    };
  } else {
    const items = data.nombre_lits_journee_hospitalisation;
    return {
      ...result,
      etablissements: items.map((item) => {
        return {
          finess: item.finess || "",
          nombre_journees_hospitalisation: item.nombre_journees_hospitalisation
            ? parseFloat(item.nombre_journees_hospitalisation)
            : "",
          nombre_lits: item.nombre_lits ? parseFloat(item.nombre_lits) : "",
          raison_sociale: item.raison_sociale || "",
          statut: item.statut || "",
          type: item.type || "",
          nombre_journees_esms: item.nombre_journees_esms
            ? parseFloat(item.nombre_journees_esms)
            : "",
          nombre_mesures: item.nombre_mesures ? parseFloat(item.nombre_mesures) : "",
        };
      }),
    };
  }
}

// nested arrays: https://jaredpalmer.com/formik/docs/guides/arrays
export const EnquetePreposeModaliteExerciceEtablissementsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const {
    submitForm,
    handleChange,
    setFieldValue,
    handleBlur,
    values,
    errors,
    showError,
    submit,
    formik,
  } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });
  return (
    <FormikProvider value={formik}>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Modalité d'exercice"}
        </Heading1>
        <Box mb={4}>
          <Label mb={1} htmlFor="actions_information_tuteurs_familiaux">
            {"Vous menez des actions d'information des tuteurs familiaux"}
          </Label>
          <YesNoComboBox
            defaultValue={values.actions_information_tuteurs_familiaux}
            name="actions_information_tuteurs_familiaux"
            onChange={(value) => {
              setFieldValue("actions_information_tuteurs_familiaux", value);
            }}
          />
        </Box>
        <FieldArray
          name="etablissements"
          render={(arrayHelpers) => (
            <Box>
              <Flex mb={4} alignItems="center" justifyContent="space-between">
                <Heading3>{`${values.etablissements.length} établissement${
                  values.etablissements.length > 1 ? "s" : ""
                }`}</Heading3>

                <Box>
                  <Button
                    type="button"
                    onClick={() => {
                      arrayHelpers.push({
                        finess: "",
                        nombre_journees_hospitalisation: "",
                        nombre_lits: "",
                        raison_sociale: "",
                        statut: "",
                        type: "",
                        nombre_journees_esms: "",
                        nombre_mesures: "",
                      });
                    }}
                  >
                    Ajouter un établissement
                  </Button>
                </Box>
              </Flex>
              {values.etablissements.map((etablissement, index) => {
                const value = values.etablissements ? values.etablissements[index] : {};
                const error = errors.etablissements ? errors.etablissements[index] : {};

                return (
                  <Card mb={4} key={`etablissement-${index}`} sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 2,
                        cursor: "pointer",
                      }}
                    >
                      <SquaredCross width={"20px"} onClick={() => arrayHelpers.remove(index)} />
                    </Box>
                    <Flex mt={4} mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "finess",
                          label: "N° FINESS",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "raison_sociale",
                          label: "Raison sociale",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        {renderArraySelect({
                          attr: "statut",
                          label: "Statut de l'établissement",
                          options: STATUTS,
                          index,
                          value,
                          error,
                        })}
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        {renderArraySelect({
                          attr: "type",
                          label: "Type d'établissement",
                          options: TYPES,
                          index,
                          value,
                          error,
                        })}
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "nombre_lits",
                          label: "Nombre de lits ou de places",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "nombre_journees_hospitalisation",
                          label: "Nombre de journées d'hospitalisation complètes",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "nombre_mesures",
                          label: "Nombre de mesures au 31/12",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        {renderArrayInput({
                          attr: "nombre_journees_esms",
                          label: "Nombre de journées pour les ESMS",
                          index,
                          value,
                          error,
                        })}
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          )}
        />
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </FormikProvider>
  );
  function renderArrayInput({ index, label, attr, value, error }) {
    const id = `etablissements[${index}].${attr}`;
    return (
      <Fragment>
        <Label mb={1} htmlFor={id}>
          {label}
        </Label>
        <Input
          id={id}
          name={id}
          value={value[attr]}
          placeholder=""
          hasError={showError && error ? !!error[attr] : false}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
        />
        {showError && <InlineError message={error ? error[attr] : ""} fieldId={id} />}
      </Fragment>
    );
  }
  function renderArraySelect({ index, label, attr, options, value, error }) {
    const id = `etablissements[${index}].${attr}`;
    return (
      <Fragment>
        <Label mb={1} htmlFor={id}>
          {label}
        </Label>
        <Select
          placeholder=""
          instanceId={id}
          id={id}
          name={id}
          value={findOption(options.byKey, value[attr])}
          hasError={showError && error ? !!error[attr] : false}
          onChange={(option) => setFieldValue(id, option.value)}
          options={options.byKey}
        />
        {showError && <InlineError message={error ? error[attr] : ""} fieldId={id} />}
      </Fragment>
    );
  }
};

export default EnquetePreposeModaliteExerciceEtablissementsForm;
