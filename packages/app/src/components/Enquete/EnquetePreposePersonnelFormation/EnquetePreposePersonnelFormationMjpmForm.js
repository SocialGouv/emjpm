import { Field, Heading1, Heading3, Heading5, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePreposePersonnelFormationMjpmFormMapper } from "./EnquetePreposePersonnelFormationMjpmFormMapper";
import { enquetePreposePersonnelFormationMjpmFormSchema as validationSchema } from "./EnquetePreposePersonnelFormationMjpmFormSchema";

export const EnquetePreposePersonnelFormationMjpmForm = props => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent
  } = props;

  const {
    submitForm,
    handleChange,
    handleBlur,
    values,
    errors,
    showError,
    submit
  } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm: enquetePreposePersonnelFormationMjpmFormMapper.dataToForm(data),
    loading
  });

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Personnel et formation"}
        </Heading1>
        <Heading3>{"Informations relatives aux préposés MJPM"}</Heading3>

        <Box mt={1}>
          <Heading5 mt={1} mb="2">
            Nombre de préposés MJPM au 31/12/2019
          </Heading5>
          <Flex alignItems="start">
            <Box mr={1} flex={1 / 2}>
              <Field>
                <Label mb={1} htmlFor="nb_preposes_mjpm">
                  {"Nombre de préposés"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_preposes_mjpm"
                  name="nb_preposes_mjpm"
                  value={values.nb_preposes_mjpm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  hasError={showError && !!errors.nb_preposes_mjpm}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_preposes_mjpm}
                  fieldId="nb_preposes_mjpm"
                />
              </Field>
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <Label mb={1} htmlFor="nb_preposes_mjpm_etp">
                  {"Nombre de préposés en ETP"}
                </Label>
                <Input
                  placeholder=""
                  id="nb_preposes_mjpm_etp"
                  name="nb_preposes_mjpm_etp"
                  value={values.nb_preposes_mjpm_etp}
                  onChange={handleChange}
                  type="text"
                  hasError={showError && !!errors.nb_preposes_mjpm_etp}
                />
                <InlineError
                  showError={showError}
                  message={errors.nb_preposes_mjpm_etp}
                  fieldId="nb_preposes_mjpm_etp"
                />
              </Field>
            </Box>
          </Flex>
        </Box>
        <Box mt={1}>
          <Heading3>{"Formation des préposés MJPM au CNC"}</Heading3>
          <Box>
            {renderFormationPreposeBox({
              prefix: "en_poste_cnc",
              label: "Préposés CNC en poste au 01/01/2020"
            })}
          </Box>
          <Box>
            {renderFormationPreposeBox({
              prefix: "embauches_cnc",
              label: "Préposés CNC embauchés depuis le 01/01/2020"
            })}
          </Box>
          <Box>
            {renderFormationPreposeBox({
              prefix: "formation_non_cnc",
              label: "Préposés en cours de formation"
            })}
          </Box>
        </Box>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </Box>
  );

  // prefix: 'en_poste_cnc' || 'embauches_cnc' || 'formation_non_cnc'
  function renderFormationPreposeBox({ prefix, label }) {
    return (
      <Fragment>
        <Heading5 mt={1} mb="2">
          {label}
        </Heading5>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <Field>
              <Label mb={1} htmlFor={`formation_preposes_mjpm.${prefix}.nb_preposes`}>
                {"Nombre de préposés"}
              </Label>
              <Input
                placeholder=""
                id={`formation_preposes_mjpm.${prefix}.nb_preposes`}
                name={`formation_preposes_mjpm.${prefix}.nb_preposes`}
                value={values.formation_preposes_mjpm[prefix].nb_preposes}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                hasError={
                  showError &&
                  !!(
                    errors.formation_preposes_mjpm &&
                    errors.formation_preposes_mjpm[prefix] &&
                    errors.formation_preposes_mjpm[prefix].nb_preposes
                  )
                }
              />
              <InlineError
                showError={showError}
                message={
                  errors.formation_preposes_mjpm && errors.formation_preposes_mjpm[prefix]
                    ? errors.formation_preposes_mjpm[prefix].nb_preposes
                    : ""
                }
                fieldId={`formation_preposes_mjpm.${prefix}.nb_preposes`}
              />
            </Field>
          </Box>
          <Box ml={1} flex={1 / 2}>
            <Field>
              <Label mb={1} htmlFor={`formation_preposes_mjpm.${prefix}.heures_formation`}>
                {"Total heures de formation effectuées/prévues"}
              </Label>
              <Input
                placeholder=""
                id={`formation_preposes_mjpm.${prefix}.heures_formation`}
                name={`formation_preposes_mjpm.${prefix}.heures_formation`}
                value={values.formation_preposes_mjpm[prefix].heures_formation}
                onChange={handleChange}
                type="text"
                hasError={
                  showError &&
                  !!(
                    errors.formation_preposes_mjpm &&
                    errors.formation_preposes_mjpm[prefix] &&
                    errors.formation_preposes_mjpm[prefix].heures_formation
                  )
                }
              />
              <InlineError
                showError={showError}
                message={
                  errors.formation_preposes_mjpm && errors.formation_preposes_mjpm[prefix]
                    ? errors.formation_preposes_mjpm[prefix].heures_formation
                    : ""
                }
                fieldId={`formation_preposes_mjpm.${prefix}.heures_formation`}
              />
            </Field>
          </Box>
        </Flex>
      </Fragment>
    );
  }
};

export default EnquetePreposePersonnelFormationMjpmForm;
