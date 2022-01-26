import { useMemo } from "react";
import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import { useApolloClient } from "@apollo/client";

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

import ServiceReservation from "./ServiceReservation";

export function MagistratMesureAddForm(props) {
  const { cancelActionRoute, handleSubmit, cabinet } = props;
  const history = useHistory();

  const { serviceId, mandataireId } = props;

  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => magistratMandataireSchema({ apolloClient, serviceId, mandataireId }),
    [apolloClient, serviceId, mandataireId]
  );

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
    validationSchema,
  });

  const isService = !!serviceId;

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} id="jugement_heading">
            Jugement
          </Heading>
          <Text lineHeight="1.5">{"Information sur le jugement."}</Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="jugement_heading">
          <FormGroupInput
            id="numero_rg"
            label="Numéro RG"
            placeholder="8 chiffres ou lettres"
            forceActive
            formik={formik}
            size="small"
            validationSchema={validationSchema}
            onInput={(e) => {
              let value = e.target.value || "";
              value = value.toUpperCase().trim();
              formik.setFieldValue("numero_rg", value);
              if (!/^[a-z0-9]+$/i.test(value)) {
                formik.setFieldTouched("numero_rg");
              }
            }}
            errorMessage={formik.errors.numero_rg}
          />
          <FormGroupInput
            id="cabinet"
            placeholder="Cabinet du tribunal"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />
          <FormGroupInputDate
            value={formik.values.judgmentDate}
            id="judgmentDate"
            label="Date prévisionnelle du jugement"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            formik={formik}
            validationSchema={validationSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} id="majeur_protege_heading">
            Majeur protégé
          </Heading>
          <Text lineHeight="1.5">{"Informations sur le majeur protégé"}</Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="majeur_protege_heading">
          <FormGroupSelect
            id="civilite"
            placeholder="Civilité"
            options={MESURE_PROTECTION.CIVILITE.options}
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />
          <FormGroupInputYear
            id="annee_naissance"
            label="Année de naissance"
            placeholder="aaaa"
            title="Format: aaaa. Exemple: 2021"
            formik={formik}
            validationSchema={validationSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} id="mesure_de_protection">
            Mesure de protection
          </Heading>
          <Text lineHeight="1.5">
            {"Informations sur la mesure de protection"}
          </Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="mesure_de_protection">
          <FormGroupSelect
            id="nature_mesure"
            placeholder="Nature de la mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />
          <FormGroupSelect
            id="champ_mesure"
            placeholder="Champ de la mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            formik={formik}
            size="small"
            isClearable
            validationSchema={validationSchema}
          />
          <FormGroupSelect
            id="urgent"
            placeholder="Est-ce une demande urgente"
            options={IS_URGENT}
            formik={formik}
            size="small"
            validationSchema={validationSchema}
          />
        </FormInputBox>
      </Flex>
      {isService && (
        <ServiceReservation
          formik={formik}
          schema={validationSchema}
          serviceId={serviceId}
        />
      )}
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
