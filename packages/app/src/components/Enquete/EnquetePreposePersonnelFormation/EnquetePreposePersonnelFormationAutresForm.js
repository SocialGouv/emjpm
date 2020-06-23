import { Heading1, Heading5 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePreposePersonnelFormationAutresFormMapper } from "./EnquetePreposePersonnelFormationAutresFormMapper";
import { enquetePreposePersonnelFormationAutresFormSchema as validationSchema } from "./EnquetePreposePersonnelFormationAutresFormSchema";

const dataToForm = enquetePreposePersonnelFormationAutresFormMapper.dataToForm;
export const EnquetePreposePersonnelFormationAutresForm = (props) => {
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
    loading,
  });

  const { submitForm, values, errors, submit } = enqueteForm;

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
        <Heading1 mb={1}>{"Personnel et formation en 2019"}</Heading1>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>

      <Box mt={1}>
        <Heading5 mt={1} mb="2">
          Répartition des préposés en fonction de leur niveau de formation
        </Heading5>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n1",
            label: "Niveau 1",
          })}
        </Box>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n2",
            label: "Niveau 2",
          })}
        </Box>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n3",
            label: "Niveau 3",
          })}
        </Box>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n4",
            label: "Niveau 4",
          })}
        </Box>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n5",
            label: "Niveau 5",
          })}
        </Box>
        <Box>
          {renderNiveauxQualificationBox({
            niveau: "n6",
            label: "Niveau 6",
          })}
        </Box>
      </Box>
      <Box mt={1}>
        <Heading5 mt={1} mb="2">
          Répartition par sexe des préposés
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_preposes_homme"
              label="Hommes"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_preposes_femme"
              label="Femmes"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Box>
      <Box mt={1}>
        <Heading5 mt={1} mb="2">
          Nombre d&apos;autres personnels (dont secrétaires spécialisés)
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_autre_personnel"
              label="Nombre d'autres personnels"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_autre_personnel_etp"
              label="Nombre d'autres personnels en ETP"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Box>
      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </Box>
  );

  // niveau: 'n1' || 'n2' || 'n3' || 'n4' || 'n5' || 'n6'
  function renderNiveauxQualificationBox({ niveau, label }) {
    return (
      <Fragment>
        <Heading5 mt={1} mb="2">
          {label}
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`niveaux_qualification.${niveau}.nb_preposes`}
              value={values.niveaux_qualification[niveau].nb_preposes}
              error={
                errors.niveaux_qualification && errors.formation_preposes_mjpm[niveau]
                  ? errors.formation_preposes_mjpm[niveau].nb_preposes
                  : ""
              }
              label="Nombre de préposés"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`niveaux_qualification.${niveau}.nb_preposes_etp`}
              value={values.niveaux_qualification[niveau].nb_preposes_etp}
              error={
                errors.niveaux_qualification && errors.nb_preposes_etp[niveau]
                  ? errors.formation_preposes_mjpm[niveau].nb_preposes_etp
                  : ""
              }
              label="Nombre de préposés en ETP"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Fragment>
    );
  }
};

export default EnquetePreposePersonnelFormationAutresForm;
