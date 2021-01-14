import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat, parseFormInt } from "~/util";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteFormFieldLabel } from "../EnqueteForm/EnqueteFormFieldLabel";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  nb_delegues: yup.number().min(0).integer().nullable(),
  nb_delegues_cnc: yup.number().integer().min(0).nullable(),
  nb_delegues_en_formation: yup.number().integer().min(0).nullable(),
  nb_delegues_etp: yup.number().min(0).nullable(),
  nb_delegues_femme: yup.number().integer().min(0).nullable(),
  nb_delegues_femme_etp: yup.number().min(0).nullable(),
  nb_delegues_homme: yup.number().integer().min(0).nullable(),
  nb_delegues_homme_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau1: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau1_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau2: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau2_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau3: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau3_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau4: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau4_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau5: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau5_etp: yup.number().min(0).nullable(),
  nb_delegues_niveau6: yup.number().integer().min(0).nullable(),
  nb_delegues_niveau6_etp: yup.number().min(0).nullable(),
  nb_delegues_non_formes: yup.number().integer().min(0).nullable(),
  total_heures_delegues_en_formation: yup.number().min(0).nullable(),
});

function dataToForm(data) {
  const formData = {
    nb_delegues: formatFormInput(data.nb_delegues),
    nb_delegues_cnc: formatFormInput(data.nb_delegues_cnc),
    nb_delegues_en_formation: formatFormInput(data.nb_delegues_en_formation),
    nb_delegues_etp: formatFormInput(data.nb_delegues_etp),
    nb_delegues_femme: formatFormInput(data.nb_delegues_femme),
    nb_delegues_femme_etp: formatFormInput(data.nb_delegues_femme_etp),
    nb_delegues_homme: formatFormInput(data.nb_delegues_homme),
    nb_delegues_homme_etp: formatFormInput(data.nb_delegues_homme_etp),
    nb_delegues_niveau1: formatFormInput(data.nb_delegues_niveau1),
    nb_delegues_niveau1_etp: formatFormInput(data.nb_delegues_niveau1_etp),
    nb_delegues_niveau2: formatFormInput(data.nb_delegues_niveau2),
    nb_delegues_niveau2_etp: formatFormInput(data.nb_delegues_niveau2_etp),
    nb_delegues_niveau3: formatFormInput(data.nb_delegues_niveau3),
    nb_delegues_niveau3_etp: formatFormInput(data.nb_delegues_niveau3_etp),
    nb_delegues_niveau4: formatFormInput(data.nb_delegues_niveau4),
    nb_delegues_niveau4_etp: formatFormInput(data.nb_delegues_niveau4_etp),
    nb_delegues_niveau5: formatFormInput(data.nb_delegues_niveau5),
    nb_delegues_niveau5_etp: formatFormInput(data.nb_delegues_niveau5_etp),
    nb_delegues_niveau6: formatFormInput(data.nb_delegues_niveau6),
    nb_delegues_niveau6_etp: formatFormInput(data.nb_delegues_niveau6_etp),
    nb_delegues_non_formes: formatFormInput(data.nb_delegues_non_formes),
    total_heures_delegues_en_formation: formatFormInput(
      data.total_heures_delegues_en_formation
    ),
  };
  return formData;
}

function formToData(data) {
  return {
    nb_delegues: parseFormInt(data.nb_delegues),
    nb_delegues_cnc: parseFormInt(data.nb_delegues_cnc),
    nb_delegues_en_formation: parseFormInt(data.nb_delegues_en_formation),
    nb_delegues_etp: parseFormFloat(data.nb_delegues_etp),
    nb_delegues_femme: parseFormInt(data.nb_delegues_femme),
    nb_delegues_femme_etp: parseFormFloat(data.nb_delegues_femme_etp),
    nb_delegues_homme: parseFormInt(data.nb_delegues_homme),
    nb_delegues_homme_etp: parseFormFloat(data.nb_delegues_homme_etp),
    nb_delegues_niveau1: parseFormInt(data.nb_delegues_niveau1),
    nb_delegues_niveau1_etp: parseFormFloat(data.nb_delegues_niveau1_etp),
    nb_delegues_niveau2: parseFormInt(data.nb_delegues_niveau2),
    nb_delegues_niveau2_etp: parseFormFloat(data.nb_delegues_niveau2_etp),
    nb_delegues_niveau3: parseFormInt(data.nb_delegues_niveau3),
    nb_delegues_niveau3_etp: parseFormFloat(data.nb_delegues_niveau3_etp),
    nb_delegues_niveau4: parseFormInt(data.nb_delegues_niveau4),
    nb_delegues_niveau4_etp: parseFormFloat(data.nb_delegues_niveau4_etp),
    nb_delegues_niveau5: parseFormInt(data.nb_delegues_niveau5),
    nb_delegues_niveau5_etp: parseFormFloat(data.nb_delegues_niveau5_etp),
    nb_delegues_niveau6: parseFormInt(data.nb_delegues_niveau6),
    nb_delegues_niveau6_etp: parseFormFloat(data.nb_delegues_niveau6_etp),
    nb_delegues_non_formes: parseFormInt(data.nb_delegues_non_formes),
    total_heures_delegues_en_formation: parseFormFloat(
      data.total_heures_delegues_en_formation
    ),
  };
}

export function EnqueteServicePersonnelFormationForm(props) {
  const {
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

  const { submitForm, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <Box textAlign="center" mb={"50px"}>
        <HeadingTitle mb={1}>{"Personnel et Formation"}</HeadingTitle>
      </Box>
      <Box mt={4}>
        <Text fontWeight="bold" my={4}>
          La formation des délégués à la protection des majeurs
        </Text>

        <Flex alignCenter="start">
          <Box mr={2} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_delegues"
              label="Nombre de délégués au 31/12"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 2}>
            <EnqueteFormInputField
              id="nb_delegues_etp"
              label="Nombre de délégués en ETP au 31/12"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>

        <Text fontWeight="bold" my={4}>
          Formation au CNC
        </Text>

        <Flex mb={2} alignCenter="start">
          <Box mr={2} flex={1 / 3} />
          <Box alignSelf="flex-end" mr={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre de délégués au 31/12"}
              required={false}
            />
          </Box>
          <Box alignSelf="flex-end" ml={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre total d'heures de formation"}
              required={false}
            />
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Délégués ayant leur CNC
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_cnc"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <Text textAlign="center">---</Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Délégués en formation
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_en_formation"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="total_heures_delegues_en_formation"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Délégués ni formés, ni en formation
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_non_formes"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <Text textAlign="center">---</Text>
          </Box>
        </Flex>

        <Text fontWeight="bold" my={4}>
          Informations relatives aux délégués à la protection des majeurs
        </Text>

        <Flex mb={2} alignCenter="start">
          <Box mr={2} flex={1 / 3} />
          <Box alignSelf="flex-end" mr={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre de délégués au 31/12"}
              required={false}
            />
          </Box>
          <Box alignSelf="flex-end" ml={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre de délégués en ETP au 31/12"}
              required={false}
            />
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau I
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau1"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <Text textAlign="center">
              <EnqueteFormInputField
                id="nb_delegues_niveau1_etp"
                label=""
                enqueteContext={enqueteContext}
                enqueteForm={enqueteForm}
                type="number"
              />
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau II
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau2"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau2_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau III
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau3"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau3_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau IV
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau4"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau4_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau V
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau5"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau5_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Niveau VI
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau6"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_niveau6_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>

        <Text fontWeight="bold" my={4}>
          {"Répartition par sexe des délégués à la protection des majeurs"}
        </Text>

        <Flex mb={2} alignCenter="start">
          <Box mr={2} flex={1 / 3} />
          <Box alignSelf="flex-end" mr={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre de délégués au 31/12"}
              required={false}
            />
          </Box>
          <Box alignSelf="flex-end" ml={2} flex={1 / 3}>
            <EnqueteFormFieldLabel
              enqueteForm={enqueteForm}
              label={"Nombre de délégués en ETP au 31/12"}
              required={false}
            />
          </Box>
        </Flex>

        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Femme
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_femme"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_femme_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={2} flex={1 / 3}>
            <Text fontSize={"12px"} textAlign="right">
              Homme
            </Text>
          </Box>
          <Box mr={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_homme"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
          <Box ml={2} flex={1 / 3}>
            <EnqueteFormInputField
              id="nb_delegues_homme_etp"
              label=""
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Box>
        </Flex>
      </Box>
      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
}

export default EnqueteServicePersonnelFormationForm;
