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
  FormGroupInputYear,
  FormGroupSelect,
  FormInputBox,
  AccessibleFormGroupInputDate,
} from "~/components/AppForm";
import { IS_URGENT } from "~/constants/mesures";
import { magistratMandataireSchema } from "~/validation-schemas";
import { Button, Heading, Text, SrOnly } from "~/components";

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
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex id="magistrat_mesure_add">
        <FormGrayBox>
          <Heading size={4} id="jugement_heading">
            Jugement
          </Heading>
          <Text lineHeight="1.5">{"Information sur le jugement."}</Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="jugement_heading">
          <FormGroupInput
            id="numero_rg"
            ariaLabel="Numéro RG"
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
            ariaDescribedBy="format_rg_attendu"
          />
          <SrOnly id="format_rg_attendu">
            Format : 8 chiffres ou lettres. Exemple : 12A34567
          </SrOnly>
          <FormGroupInput
            id="cabinet"
            placeholder="Cabinet du tribunal"
            formik={formik}
            size="small"
            validationSchema={validationSchema}
            ariaLabel="Cabinet du tribunal"
          />
          <div style={{ marginBottom: "30px" }}>
            <AccessibleFormGroupInputDate
              title="Format: jj/mm/aaaa. Exemple 01/01/2021"
              id="judgmentDate"
              label="Date prévisionnelle du jugement"
              placeholder="jj/mm/aaaa"
              formik={formik}
              size="small"
              validationSchema={validationSchema}
              value={formik.values.judgmentDate}
              ariaLabelledBy="judgmentDate_label"
              ariaDescribedBy="judgmentDate_format_attendu"
            />
          </div>

          <SrOnly id="judgmentDate_label">
            Date prévisionnelle du jugement
          </SrOnly>
          <SrOnly id="judgmentDate_format_attendu">
            Format : Format: jj/mm/aaaa. Exemple 01/01/2021
          </SrOnly>
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
            aria-label="Votre civilité"
          />
          <FormGroupInputYear
            id="annee_naissance"
            label="Année de naissance"
            placeholder="aaaa"
            title="Format: aaaa. Exemple: 2021"
            formik={formik}
            validationSchema={validationSchema}
            aria-label="Année de naissance"
            ariaDescribedBy="annee_naissance_format_attendu"
            ariaLabelledBy="annee_naissance_label"
          />
          <SrOnly id="annee_naissance_label">Votre année de naissance</SrOnly>
          <SrOnly id="annee_naissance_format_attendu">
            Format: aaaa. Exemple: 2021
          </SrOnly>
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
            aria-label="Nature de la mesure"
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
            role="link"
            mr="2"
            variant="outline"
            onClick={() => {
              if (cancelActionRoute) {
                history.push(cancelActionRoute.to);
              }
            }}
            title="Annuler l'enregistrement de la réservation de la mesure"
            aria-label="Annuler l'enregistrement de la réservation de la mesure"
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            title="Enregistrer la réservation de la mesure"
            aria-label="Enregistrer la réservation de la mesure"
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
