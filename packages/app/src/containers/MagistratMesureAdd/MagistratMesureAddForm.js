import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupInputDate,
  FormGroupInputYear,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { IS_URGENT } from "~/constants/mesures";
import { magistratMandataireSchema } from "~/validation-schemas";
import { Button, Heading, Text } from "~/components";

export function MagistratMesureAddForm(props) {
  const { cancelActionRoute, handleSubmit, cabinet } = props;
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      annee_naissance: "",
      cabinet: cabinet || null,
      champ_mesure: "",
      civilite: "",
      judgmentDate: "",
      nature_mesure: "",
      numero_rg: "",
      urgent: false,
    },
    onSubmit: handleSubmit,
    validationSchema: magistratMandataireSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Jugement</Heading>
          <Text lineHeight="1.5">{"Information sur le jugement."}</Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            id="numero_rg"
            placeholder="Numéro RG"
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
          <FormGroupInput
            id="cabinet"
            placeholder="Cabinet du tribunal (optionnel)"
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
          <FormGroupInputDate
            value={formik.values.judgmentDate}
            id="judgmentDate"
            label="Date prévisionnelle du jugement (optionnel)"
            placeholder="jj/mm/aaaa"
            formik={formik}
            validationSchema={magistratMandataireSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Majeur protégé</Heading>
          <Text lineHeight="1.5">{"Informations sur le majeur protégé"}</Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="civilite"
            placeholder="Civilité"
            options={MESURE_PROTECTION.CIVILITE.options}
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
          <FormGroupInputYear
            id="annee_naissance"
            label="Année de naissance"
            placeholder="aaaa"
            formik={formik}
            validationSchema={magistratMandataireSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>Mesure de protection</Heading>
          <Text lineHeight="1.5">
            {"Informations sur la mesure de protection"}
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="nature_mesure"
            placeholder="Nature de la mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
          <FormGroupSelect
            id="champ_mesure"
            placeholder="Champ de la mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
          <FormGroupSelect
            id="urgent"
            placeholder="Est-ce une demande urgente"
            options={IS_URGENT}
            formik={formik}
            size="small"
            validationSchema={magistratMandataireSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex justifyContent="flex-end" py={2}>
        <Box>
          <Button
            mr="2"
            variant="outline"
            onClick={() => {
              if (cancelActionRoute) {
                history.push(cancelActionRoute.to);
              }
            }}
          >
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

MagistratMesureAddForm.propTypes = {
  antenneId: PropTypes.number,
  cancelActionRoute: PropTypes.object,
  mandataireId: PropTypes.number,
};
