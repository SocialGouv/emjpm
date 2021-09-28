import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupInputDate,
  FormGroupInputYear,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import TribunalAutoComplete from "~/containers/TribunalAutoComplete";
import { mesureEditSchema } from "~/validation-schemas";
import { Button, Heading } from "~/components";

import isInt from "~/utils/std/isInt";
import { MESSAGE_VALID_NUMERO_RG } from "~/utils/data/numero-rg";

function initialValues(mesure) {
  return {
    annee_naissance: isInt(mesure.age) ? mesure.age : "",
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
    <form noValidate onSubmit={formik.handleSubmit}>
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
                title={MESSAGE_VALID_NUMERO_RG}
              />
            </Box>
            <Box style={{ minWidth: "200px" }} pl="1px">
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

          <FormGroupInputYear
            label="Année de naissance"
            placeholder="aaaa"
            title="Format: aaaa. Exemple: 2021"
            id="annee_naissance"
            formik={formik}
            validationSchema={mesureEditSchema}
          />
          <FormGroupInputDate
            label="Date de première mise sous protection"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
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
            <Box style={{ minWidth: "200px" }} pl="1px">
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
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            id="date_nomination"
            formik={formik}
            validationSchema={mesureEditSchema}
          />
          <FormGroupInputDate
            label="Date de la protection en cours"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
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
