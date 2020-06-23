import { Heading1, Heading3 } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat, parseFormInput } from "../../../util";
import { PERSONNALITE_JURIDIQUE } from "../constants";
import {
  EnqueteFormFieldLabel,
  EnqueteFormInputField,
  EnqueteFormSelectField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  departement: yup.string().required(),
  region: yup.string().required(),
  raison_sociale: yup.string().required(),
  personnalite_juridique_etablissement: yup.string().required(),
  activite_personne_physique: yup.number().min(0).required(),
  activite_service: yup.number().min(0).required(),
  total_mesures_etablissements: yup.number().min(0).required(),
  etablissement_personne_morale: yup.number().min(0).required(),
  etablissement_convention_groupement: yup.number().min(0).required(),
});

function dataToForm(data) {
  return {
    departement: formatFormInput(data.departement),
    region: formatFormInput(data.region),
    raison_sociale: formatFormInput(data.raison_sociale),
    personnalite_juridique_etablissement: formatFormInput(
      data.personnalite_juridique_etablissement
    ),
    activite_personne_physique: formatFormInput(data.activite_personne_physique),
    activite_service: formatFormInput(data.activite_service),
    total_mesures_etablissements: formatFormInput(data.total_mesures_etablissements),
    etablissement_personne_morale: formatFormInput(data.etablissement_personne_morale),
    etablissement_convention_groupement: formatFormInput(data.etablissement_convention_groupement),
  };
}
function formToData(values) {
  return {
    departement: parseFormInput(values.departement),
    region: parseFormInput(values.region),
    raison_sociale: parseFormInput(values.raison_sociale),
    personnalite_juridique_etablissement: parseFormInput(
      values.personnalite_juridique_etablissement
    ),
    activite_personne_physique: parseFormFloat(values.activite_personne_physique),
    activite_service: parseFormFloat(values.activite_service),
    total_mesures_etablissements: parseFormFloat(values.total_mesures_etablissements),
    etablissement_personne_morale: parseFormFloat(values.etablissement_personne_morale),
    etablissement_convention_groupement: parseFormFloat(
      parseFormInput(values.etablissement_convention_groupement)
    ),
  };
}

function getEtablissementsCount(values) {
  const etablissementPersonneMorale = parseInt(values.etablissement_personne_morale || "0", 10);
  const etablissement = parseInt(values.etablissement_convention_groupement || "0", 10);
  return etablissementPersonneMorale + etablissement;
}

export const EnquetePreposeModaliteExerciceInformationsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
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

  const { submitForm, values, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Modalité d'exercice"}
      </Heading1>
      <Heading3>{"Informations générales"}</Heading3>
      <Box mt={4}>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="region"
              label="Région"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="departement"
              label="Département"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>

        <EnqueteFormInputField
          id="raison_sociale"
          label="Raison sociale de l'établissement dont dépend le préposé"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="personnalite_juridique_etablissement"
          label="Indiquez la personnalité juridique de l'établissement dont dépend le(s) préposé(s) dans le menu déroulant"
          options={PERSONNALITE_JURIDIQUE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <Box>
          <Label>{"L'activité de préposé est exercée par :"}</Label>
          <Flex mt={2} alignItems="start">
            <Flex flex={1 / 2} alignItems="center">
              <EnqueteFormInputField
                id="activite_personne_physique"
                size="small"
                type="number"
                min={0}
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              >
                <Box ml={3}>
                  <EnqueteFormFieldLabel
                    text="personne(s) physique(s)"
                    id="activite_personne_physique"
                    enqueteForm={enqueteForm}
                  />
                </Box>
              </EnqueteFormInputField>
            </Flex>
            <Flex flex={1 / 2} alignItems="center">
              <EnqueteFormInputField
                id="activite_service"
                size="small"
                type="number"
                min={0}
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              >
                <Box ml={3}>
                  <EnqueteFormFieldLabel
                    text="service(s) au sens de l'article L312-1 du CASF"
                    id="activite_service"
                    enqueteForm={enqueteForm}
                  />
                </Box>
              </EnqueteFormInputField>
            </Flex>
          </Flex>
        </Box>

        <Box>
          <Label>
            {"Nombre d'établissements auprès desquels est exercée l'activité de préposé MJPM :"}
          </Label>
          <Flex mt={2} alignItems="start">
            <Flex flex={1 / 2} alignItems="center">
              <EnqueteFormInputField
                id="etablissement_personne_morale"
                size="small"
                type="number"
                min={0}
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              >
                <Box ml={3}>
                  <EnqueteFormFieldLabel
                    text="établissement(s) dépendant de la même personne morale"
                    id="etablissement_personne_morale"
                    enqueteForm={enqueteForm}
                  />
                </Box>
              </EnqueteFormInputField>
            </Flex>
            <Flex flex={1 / 2} alignItems="center">
              <EnqueteFormInputField
                id="etablissement_convention_groupement"
                size="small"
                type="number"
                min={0}
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
              >
                <Box ml={3}>
                  <EnqueteFormFieldLabel
                    text="établissement(s) dans le cadre d'une convention ou d'un groupement (SIH, GCS, GCSMS, GIP)."
                    id="etablissement_convention_groupement"
                    enqueteForm={enqueteForm}
                  />
                </Box>
              </EnqueteFormInputField>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2}>
          <EnqueteFormInputField
            id="total_mesures_etablissements"
            size="small"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          >
            <Box ml={3}>
              <EnqueteFormFieldLabel id="total_mesures_etablissements" enqueteForm={enqueteForm}>
                mesure(s) prises en charge par ces{" "}
                <strong>{getEtablissementsCount(values) || ""}</strong> établissements
              </EnqueteFormFieldLabel>
            </Box>
          </EnqueteFormInputField>
        </Box>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnquetePreposeModaliteExerciceInformationsForm;
