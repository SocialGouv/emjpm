import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupInputDate,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import TribunalAutoComplete from "~/containers/TribunalAutoComplete";
import { mesureEditSchema } from "~/validation-schemas";
import { Button, Heading } from "~/components";

function initialValues(mesure) {
  return {
    annee_naissance: mesure.age,
    antenne: mesure.antenneId || "",
    cabinet: mesure.cabinet || "",
    civilite: mesure.civilite || "",
    date_nomination: mesure.dateNomination || "",
    date_protection_en_cours: mesure.dateProtectionEnCours || "",
    numero_dossier: mesure.numeroDossier || "",
    numero_rg: mesure.numeroRg || "",
    initialNumeroRG: mesure.numeroRg || "",
    ti_id: mesure.tiId,
    date_premier_mesure: mesure.datePremierMesure,
  };
}

export function MesureEditForm(props) {
  const { antenneOptions, handleSubmit, handleCancel, mesureToEdit } = props;

  const tribunaux = [
    { label: mesureToEdit.tribunal, value: mesureToEdit.tiId },
    ...props.tribunaux,
  ];

  const formik = useFormik({
    initialValues: initialValues(mesureToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureEditSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Majeur protégé</Heading>
        </FormGrayBox>
        <FormInputBox>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <FormGroupInput
                placeholder="Numéro RG"
                id="numero_rg"
                formik={formik}
                size="small"
                validationSchema={mesureEditSchema}
              />
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Numéro de dossier"
                id="numero_dossier"
                formik={formik}
                size="small"
                validationSchema={mesureEditSchema}
              />
            </Box>
          </Flex>
          <FormGroupSelect
            id="civilite"
            options={MESURE_PROTECTION.CIVILITE.options}
            placeholder="Civilité"
            formik={formik}
            size="small"
            validationSchema={mesureEditSchema}
          />

          <FormGroupInput
            placeholder="Année de naissance"
            id="annee_naissance"
            formik={formik}
            size="small"
            validationSchema={mesureEditSchema}
          />
          <FormGroupInputDate
            label="Date de première mise sous protection"
            placeholder="jj/mm/aaaa"
            id="date_premier_mesure"
            formik={formik}
            validationSchema={mesureEditSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Mesure de protection</Heading>
        </FormGrayBox>
        <FormInputBox>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <TribunalAutoComplete
                id="ti_id"
                defaultOptions={tribunaux}
                placeholder="Tribunal"
                size="small"
                formik={formik}
                validationSchema={mesureEditSchema}
              />
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Cabinet"
                id="cabinet"
                formik={formik}
                size="small"
                validationSchema={mesureEditSchema}
              />
            </Box>
          </Flex>
          <FormGroupInputDate
            label="Date de nomination"
            placeholder="jj/mm/aaaa"
            id="date_nomination"
            formik={formik}
            validationSchema={mesureEditSchema}
          />
          <FormGroupInputDate
            label="Date de la protection en cours"
            placeholder="jj/mm/aaaa"
            id="date_protection_en_cours"
            formik={formik}
            validationSchema={mesureEditSchema}
          />
        </FormInputBox>
      </Flex>
      {antenneOptions.length > 0 && (
        <Flex>
          <FormGrayBox>
            <Heading size={4}>
              Antenne de gestion de la mesure de protection
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              size="small"
              validationSchema={mesureEditSchema}
            />
          </FormInputBox>
        </Flex>
      )}

      <Flex justifyContent="flex-end" py={2}>
        <Box>
          <Button mr="2" variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}
