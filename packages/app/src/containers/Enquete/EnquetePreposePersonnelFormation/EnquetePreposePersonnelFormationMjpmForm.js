import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { Heading } from "~/components";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";
import { enquetePreposePersonnelFormationMjpmFormMapper } from "./EnquetePreposePersonnelFormationMjpmFormMapper";
import { enquetePreposePersonnelFormationMjpmFormSchema as validationSchema } from "./EnquetePreposePersonnelFormationMjpmFormSchema";

export function EnquetePreposePersonnelFormationMjpmForm(props) {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    sections,
    enquete,
  } = props;

  const enqueteForm = useEnqueteForm({
    currentStep: props.currentStep,
    sections,
    data,
    dataToForm: enquetePreposePersonnelFormationMjpmFormMapper.dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    loading,
    onSubmit,
    step,
    validationSchema,
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
        <HeadingTitle mb={1}>
          {`Personnel et formation en ${enquete.annee - 1}`}
        </HeadingTitle>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>
      <Heading size={3}>{"Informations relatives aux préposés MJPM"}</Heading>

      <Box mt={1}>
        <Heading size={5} mt={1} mb="2">
          Nombre de préposés MJPM
        </Heading>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_preposes_mjpm"
              label="Nombre de préposés"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_preposes_mjpm_etp"
              label="Nombre de préposés en ETP"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </Box>
      <Box mt={1}>
        <Heading size={3}>{"La formation des préposés MJPM"}</Heading>
        <Box>
          {renderFormationPreposeBox({
            label: "Nombre de préposés en poste ayant le CNC",
            prefix: "en_poste_cnc",
          })}
        </Box>
        <Box>
          {renderFormationPreposeBox({
            label: "Nombre de préposés en poste et en formation",
            prefix: "formation_non_cnc",
          })}
        </Box>
        <Box>
          {renderFormationPreposeBox({
            label: "Nombre de préposés en poste ni formés, ni en formation",
            prefix: "non_formation_non_cnc",
          })}
        </Box>
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </Box>
  );

  // prefix: 'en_poste_cnc' || 'non_formation_non_cnc' || 'formation_non_cnc'
  function renderFormationPreposeBox({ prefix, label }) {
    return (
      <>
        <Heading size={5} mt={1} mb="2">
          {label}
        </Heading>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`formation_preposes_mjpm.${prefix}.nb_preposes`}
              value={values.formation_preposes_mjpm[prefix].nb_preposes}
              error={
                errors.formation_preposes_mjpm &&
                errors.formation_preposes_mjpm[prefix]
                  ? errors.formation_preposes_mjpm[prefix].nb_preposes
                  : ""
              }
              label="Nombre de préposés"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
          <Box ml={1} flex={1 / 2}>
            <EnqueteFormInputField
              id={`formation_preposes_mjpm.${prefix}.heures_formation`}
              value={values.formation_preposes_mjpm[prefix].heures_formation}
              error={
                errors.formation_preposes_mjpm &&
                errors.formation_preposes_mjpm[prefix]
                  ? errors.formation_preposes_mjpm[prefix].heures_formation
                  : ""
              }
              label="Total heures de formation effectuées/prévues"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
            />
          </Box>
        </Flex>
      </>
    );
  }
}

export default EnquetePreposePersonnelFormationMjpmForm;
