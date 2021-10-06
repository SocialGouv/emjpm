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
import { MESSAGE_VALID_NUMERO_RG } from "~/utils/data/numero-rg";
import { magistratMandataireSchema } from "~/validation-schemas";
import { Button, Heading, Text } from "~/components";

import ServiceReservation from "./ServiceReservation";
import { useMemo } from "react";

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
          <Heading size={4}>Jugement</Heading>
          <Text lineHeight="1.5">{"Information sur le jugement."}</Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            id="numero_rg"
            placeholder="Numéro RG"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
            title={MESSAGE_VALID_NUMERO_RG}
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
