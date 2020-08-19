import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, InlineError, Input, Select, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { IS_URGENT } from "../../constants/mesures";
import { magistratMandataireSchema } from "../../lib/validationSchemas";
import { GESTIONNAIRES } from "../MagistratMesureMandataire/queries";
import { UserContext } from "../UserContext";
import {
  CHOOSE_MANDATAIRE,
  CHOOSE_SERVICE,
  RECALCULATE_MANDATAIRE_MESURES,
  RECALCULATE_SERVICE_MESURES,
} from "./mutations";
import { MANDATAIRE, MESURES, SERVICE } from "./queries";

export const MagistratMesureAddForm = (props) => {
  const { serviceId, mandataireId, cancelActionRoute } = props;
  const {
    cabinet,
    magistrat: { id: magistratId, ti_id: tiId },
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES, {
    onError: () => setLoading(false),
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mandataireId },
      },
      {
        query: GESTIONNAIRES,
        variables: {
          mandataire_id: mandataireId,
          service_id: serviceId,
        },
      },
    ],
  });
  const [chooseMandataire] = useMutation(CHOOSE_MANDATAIRE, {
    onError: () => setLoading(false),
    onCompleted: async ({ insert_mesures }) => {
      const [mesure] = insert_mesures.returning;

      await recalculateMandataireMesures({
        variables: {
          mandataire_id: mandataireId,
        },
      });

      await Router.push("/magistrats/mesures/[mesure_id]", `/magistrats/mesures/${mesure.id}`, {
        shallow: true,
      });
    },
  });

  const [recalculateServiceMesures] = useMutation(RECALCULATE_SERVICE_MESURES, {
    onError: () => setLoading(false),
    refetchQueries: [
      {
        query: SERVICE,
        variables: { id: serviceId },
      },
      {
        query: GESTIONNAIRES,
        variables: {
          mandataire_id: mandataireId,
          service_id: serviceId,
        },
      },
    ],
  });
  const [chooseService] = useMutation(CHOOSE_SERVICE, {
    onError: () => setLoading(false),
    onCompleted: async ({ insert_mesures }) => {
      const [mesure] = insert_mesures.returning;
      await recalculateServiceMesures({
        variables: { service_id: serviceId },
      });
      await Router.push("/magistrats/mesures/[mesure_id]", `/magistrats/mesures/${mesure.id}`, {
        shallow: true,
      });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      if (mandataireId) {
        await chooseMandataire({
          refetchQueries: [
            { query: MESURES, variables: { serviceId, mandataireId } },
            "mesures_aggregate",
            "view_mesure_gestionnaire",
          ],
          variables: {
            annee_naissance: values.annee_naissance,
            cabinet: values.cabinet,
            civilite: values.civilite.value,
            judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
            mandataire_id: mandataireId,
            magistrat_id: magistratId,
            numero_rg: values.numero_rg,
            ti: tiId,
            nature_mesure: values.nature_mesure.value,
            champ_mesure: values.champ_mesure ? values.champ_mesure.value : null,
            urgent: values.urgent.value,
          },
        });
      } else {
        await chooseService({
          refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"],
          variables: {
            annee_naissance: values.annee_naissance,
            cabinet: values.cabinet,
            civilite: values.civilite.value,
            judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
            numero_rg: values.numero_rg,
            service_id: serviceId,
            magistrat_id: magistratId,
            ti: tiId,
            nature_mesure: values.nature_mesure.value,
            champ_mesure: values.champ_mesure.value,
            urgent: values.urgent.value,
          },
        });
      }

      setSubmitting(false);
    },
    validationSchema: magistratMandataireSchema,
    initialValues: {
      annee_naissance: "",
      cabinet,
      civilite: "",
      judgmentDate: "",
      numero_rg: "",
      nature_mesure: "",
      champ_mesure: "",
      urgent: IS_URGENT.find((lv) => lv.value == false),
    },
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" sx={{ flexGrow: 1, flexBasis: 380 }}>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de réserver une mesure aupres d'un mandataire.`}
        </Text>
        <Text lineHeight="1.5" mt=" 2">
          {`Une fois les informations souhaitées remplies, cliquer sur "Enregistrer".`}
        </Text>
      </Box>
      <Box p="5" sx={{ flexGrow: 99999, flexBasis: 0, minWidth: 320 }}>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Select
              id="nature_mesure"
              name="nature_mesure"
              placeholder="Nature de la mesure"
              value={formik.values.nature_mesure}
              hasError={formik.errors.nature_mesure && formik.touched.nature_mesure}
              onChange={(option) => formik.setFieldValue("nature_mesure", option)}
              options={MESURE_PROTECTION.NATURE_MESURE.options}
            />
            <InlineError message={formik.errors.nature_mesure} fieldId="nature_mesure" />
          </Field>
          <Field>
            <Select
              id="champ_mesure"
              name="champ_mesure"
              placeholder="Champ de la mesure"
              value={formik.values.champ_mesure}
              hasError={formik.errors.champ_mesure && formik.touched.champ_mesure}
              onChange={(option) => formik.setFieldValue("champ_mesure", option)}
              clearable={true}
              options={MESURE_PROTECTION.CHAMP_MESURE.options}
            />
            <InlineError message={formik.errors.champ_mesure} fieldId="champ_mesure" />
          </Field>
          <Field>
            <Select
              id="civilite"
              name="civilite"
              placeholder="Civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={(option) => formik.setFieldValue("civilite", option)}
              options={MESURE_PROTECTION.CIVILITE.options}
            />
            <InlineError message={formik.errors.civilite} fieldId="civilite" />
          </Field>
          <Field>
            <Input
              value={formik.values.annee_naissance}
              id="annee_naissance"
              name="annee_naissance"
              hasError={formik.errors.annee_naissance && formik.touched.annee_naissance}
              onChange={formik.handleChange}
              placeholder="Année de naissance"
            />
            <InlineError message={formik.errors.annee_naissance} fieldId="annee_naissance" />
          </Field>
          <Field>
            <Input
              value={formik.values.numero_rg}
              id="numero_rg"
              name="numero_rg"
              hasError={formik.errors.numero_rg && formik.touched.numero_rg}
              onChange={formik.handleChange}
              placeholder="Numéro RG"
            />
            <InlineError message={formik.errors.numero_rg} fieldId="numero_rg" />
          </Field>
          <Field>
            <Input
              value={formik.values.cabinet}
              id="cabinet"
              name="cabinet"
              hasError={formik.errors.cabinet && formik.touched.cabinet}
              onChange={formik.handleChange}
              placeholder="Cabinet (optionnel)"
            />
            <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
          </Field>
          <Field>
            <Select
              id="urgent"
              name="urgent"
              placeholder="Est-ce une demande urgente"
              value={formik.values.urgent}
              hasError={formik.errors.urgent && formik.touched.urgent}
              onChange={(option) => formik.setFieldValue("urgent", option)}
              options={IS_URGENT}
            />
            <InlineError message={formik.errors.urgent} fieldId="urgent" />
          </Field>
          <Field>
            <Input
              value={formik.values.judgmentDate}
              id="judgmentDate"
              name="judgmentDate"
              hasError={formik.errors.judgmentDate && formik.touched.judgmentDate}
              type="date"
              onChange={formik.handleChange}
              placeholder="Date prévisionnelle du jugement (optionnel)"
            />
            <InlineError message={formik.errors.judgmentDate} fieldId="judgmentDate" />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  if (cancelActionRoute) {
                    Router.push(cancelActionRoute.href, cancelActionRoute.as, { shallow: true });
                  }
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={loading} isLoading={loading}>
                Enregistrer
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

MagistratMesureAddForm.propTypes = {
  antenneId: PropTypes.number,
  mandataireId: PropTypes.number,
  cancelActionRoute: PropTypes.object,
};
