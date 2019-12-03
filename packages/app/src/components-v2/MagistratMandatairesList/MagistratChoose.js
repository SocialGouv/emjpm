import { useMutation } from "@apollo/react-hooks";
import { MandataireContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { Button, Heading3, Input, Select } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import * as Yup from "yup";

import { CIVILITY, IS_URGENT, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { MandataireInformations } from "./MandataireInformations";
import { CHOOSE_MANDATAIRE, CHOOSE_SERVICE } from "./mutations";

export const MagistratChoose = props => {
  const { tiId, serviceId, mandataireId, cabinet } = props;
  const [chooseMandataire] = useMutation(CHOOSE_MANDATAIRE);
  const [chooseService] = useMutation(CHOOSE_SERVICE);
  const { setCurrentMandataire, setPanelType } = useContext(MandataireContext);

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <MandataireInformations {...props} />
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>Réserver une mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            if (mandataireId) {
              chooseMandataire({
                refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"],
                variables: {
                  annee: values.annee,
                  cabinet: values.cabinet,
                  civilite: values.civilite.value,
                  judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
                  mandataire_id: mandataireId,
                  numero_rg: values.numero_rg,
                  ti: tiId,
                  type: values.type.value,
                  urgent: values.urgent.value
                }
              });
            } else {
              chooseService({
                refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"],
                variables: {
                  annee: values.annee,
                  cabinet: values.cabinet,
                  civilite: values.civilite.value,
                  judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
                  numero_rg: values.numero_rg,
                  service_id: serviceId,
                  ti: tiId,
                  type: values.type.value,
                  urgent: values.urgent.value
                }
              });
            }
            setSubmitting(false);
            setPanelType(null);
            setCurrentMandataire(null);
          }}
          validationSchema={Yup.object().shape({
            annee: Yup.string().required(),
            cabinet: Yup.string(),
            civilite: Yup.string().required(),
            judgmentDate: Yup.date(),
            numero_rg: Yup.string().required(),
            type: Yup.string().required(),
            urgent: Yup.object().shape({
              label: Yup.string(),
              value: Yup.boolean()
            })
          })}
          initialValues={{
            annee: "",
            cabinet,
            civilite: "",
            judgmentDate: "",
            numero_rg: "",
            type: "",
            urgent: IS_URGENT.find(lv => lv.value == false)
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
                  <Select
                    id="type"
                    name="type"
                    placeholder="Type de mesure"
                    value={values.type}
                    hasError={errors.type && touched.type}
                    onChange={option => setFieldValue("type", option)}
                    options={MESURE_TYPE_LABEL_VALUE}
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
                  <Select
                    id="civilite"
                    name="civilite"
                    placeholder="civilité"
                    value={values.civilite}
                    hasError={errors.civilite && touched.civilite}
                    onChange={option => setFieldValue("civilite", option)}
                    options={CIVILITY}
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.annee}
                    id="annee"
                    name="annee"
                    hasError={errors.annee && touched.annee}
                    onChange={handleChange}
                    placeholder="année"
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.numero_rg}
                    id="numero_rg"
                    name="numero_rg"
                    hasError={errors.numero_rg && touched.numero_rg}
                    onChange={handleChange}
                    placeholder="numero rg"
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.cabinet}
                    id="cabinet"
                    name="cabinet"
                    hasError={errors.cabinet && touched.cabinet}
                    onChange={handleChange}
                    placeholder="cabinet (optionnel)"
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "10" }} mb="2">
                  <Select
                    id="urgent"
                    name="urgent"
                    placeholder="Est-ce une demande urgente"
                    value={values.urgent}
                    hasError={errors.urgent && touched.urgent}
                    onChange={option => setFieldValue("urgent", option)}
                    options={IS_URGENT}
                  />
                </Box>
                <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                  <Input
                    value={values.judgmentDate}
                    id="judgmentDate"
                    name="judgmentDate"
                    hasError={errors.judgmentDate && touched.judgmentDate}
                    type="date"
                    onChange={handleChange}
                    placeholder="Date prévisionnelle du jugement (optionnel)"
                  />
                </Box>
                <Flex justifyContent="flex-end">
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        setPanelType(PANEL_TYPE.CHOOSE);
                        setCurrentMandataire(null);
                      }}
                    >
                      Annuler
                    </Button>
                  </Box>
                  <Box>
                    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                      Enregistrer
                    </Button>
                  </Box>
                </Flex>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Flex>
  );
};

MagistratChoose.propTypes = {
  antenneId: PropTypes.number,
  mandataireId: PropTypes.number
};
