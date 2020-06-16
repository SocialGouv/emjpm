import { Field, Heading1, Heading3, Heading5, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

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

  const {
    submitForm,
    handleChange,
    handleBlur,
    values,
    errors,
    showError,
    submit,
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
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Personnel et formation"}
        </Heading1>
        <Heading3>{"Autres informations relative aux préposés"}</Heading3>

        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Répartition par niveau de formation
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
              <Field>
                <Label mb={1} htmlFor="nb_preposes_homme">
                  {"Hommes au 31/12/2018"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_preposes_homme"
                  name="nb_preposes_homme"
                  value={values.nb_preposes_homme}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  hasError={showError && !!errors.nb_preposes_homme}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_preposes_homme}
                  fieldId="nb_preposes_homme"
                />
              </Field>
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <Label mb={1} htmlFor="nb_preposes_femme">
                  {"Femmes au 31/12/2018"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_preposes_femme"
                  name="nb_preposes_femme"
                  value={values.nb_preposes_femme}
                  onChange={handleChange}
                  type="text"
                  hasError={showError && !!errors.nb_preposes_femme}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_preposes_femme}
                  fieldId="nb_preposes_femme"
                />
              </Field>
            </Box>
          </Flex>
        </Box>
        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Nombre d&apos;autres personnels (dont secrétaires spécialisés)
          </Heading5>
          <Flex alignItems="start">
            <Box mr={1} flex={1 / 2}>
              <Field>
                <Label mb={1} htmlFor="nb_autre_personnel">
                  {"Nombre d'autres personnels"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_autre_personnel"
                  name="nb_autre_personnel"
                  value={values.nb_autre_personnel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  hasError={showError && !!errors.nb_autre_personnel}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_autre_personnel}
                  fieldId="nb_autre_personnel"
                />
              </Field>
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <Label mb={1} htmlFor="nb_autre_personnel_etp">
                  {"Nombre d'autres personnels en ETP"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_autre_personnel_etp"
                  name="nb_autre_personnel_etp"
                  value={values.nb_autre_personnel_etp}
                  onChange={handleChange}
                  type="text"
                  hasError={showError && !!errors.nb_autre_personnel_etp}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_autre_personnel_etp}
                  fieldId="nb_autre_personnel_etp"
                />
              </Field>
            </Box>
          </Flex>
        </Box>
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
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
            <Field>
              <Label mb={1} htmlFor={`niveaux_qualification.${niveau}.nb_preposes`}>
                {"Nombre de préposés"}
              </Label>
              <Input
                placeholder=""
                id={`niveaux_qualification.${niveau}.nb_preposes`}
                name={`niveaux_qualification.${niveau}.nb_preposes`}
                value={values.niveaux_qualification[niveau].nb_preposes}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                hasError={
                  showError &&
                  !!(
                    errors.niveaux_qualification &&
                    errors.niveaux_qualification[niveau] &&
                    errors.niveaux_qualification[niveau].nb_preposes
                  )
                }
              />
              <InlineError
                showError={showError}
                message={
                  errors.niveaux_qualification && errors.niveaux_qualification[niveau]
                    ? errors.niveaux_qualification[niveau].nb_preposes
                    : ""
                }
                fieldId={`niveaux_qualification.${niveau}.nb_preposes`}
              />
            </Field>
          </Box>
          <Box ml={1} flex={1 / 2}>
            <Field>
              <Label mb={1} htmlFor={`niveaux_qualification.${niveau}.nb_preposes_etp`}>
                {"Nombre de préposés en ETP"}
              </Label>
              <Input
                placeholder=""
                id={`niveaux_qualification.${niveau}.nb_preposes_etp`}
                name={`niveaux_qualification.${niveau}.nb_preposes_etp`}
                value={values.niveaux_qualification[niveau].nb_preposes_etp}
                onChange={handleChange}
                type="text"
                hasError={
                  showError &&
                  !!(
                    errors.niveaux_qualification &&
                    errors.niveaux_qualification[niveau] &&
                    errors.niveaux_qualification[niveau].nb_preposes_etp
                  )
                }
              />
              <InlineError
                showError={showError}
                message={
                  errors.niveaux_qualification && errors.niveaux_qualification[niveau]
                    ? errors.niveaux_qualification[niveau].nb_preposes_etp
                    : ""
                }
                fieldId={`niveaux_qualification.${niveau}.nb_preposes_etp`}
              />
            </Field>
          </Box>
        </Flex>
      </Fragment>
    );
  }
};

export default EnquetePreposePersonnelFormationAutresForm;
