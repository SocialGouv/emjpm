import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { CHOOSE_MANDATAIRE, CHOOSE_SERVICE } from "./mutations";
import { Select, Button, Input, Heading3 } from "@socialgouv/emjpm-ui-core";
import { MandataireContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { MESURE_TYPE_LABEL_VALUE, CIVILITY } from "../../constants/mesures";
import { MandataireInformations } from "./MandataireInformations";

export const MagistratChoose = props => {
  const { ti, antenneId, mandataireId, cabinet } = props;
  const [chooseMandataire] = useMutation(CHOOSE_MANDATAIRE);
  const [chooseService] = useMutation(CHOOSE_SERVICE);
  const { setCurrentMandataire, setPanelType } = useContext(MandataireContext);
  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <MandataireInformations {...props} />
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Créer une mesure</Heading3>
        </Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (mandataireId) {
                chooseMandataire({
                  variables: {
                    ti: ti,
                    cabinet: cabinet,
                    mandataire_id: mandataireId,
                    type: values.type.value,
                    civilite: values.civilite.value,
                    annee: values.annee,
                    numero_rg: values.numero_rg
                  },
                  refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"]
                });
              } else {
                chooseService({
                  variables: {
                    ti: ti,
                    cabinet: cabinet,
                    antenne_id: antenneId,
                    type: values.type.value,
                    civilite: values.civilite.value,
                    annee: values.annee,
                    numero_rg: values.numero_rg
                  },
                  refetchQueries: ["mesures", "mesures_aggregate", "view_mesure_gestionnaire"]
                });
              }

              setSubmitting(false);
              setPanelType(null);
              setCurrentMandataire(null);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            type: Yup.string().required(),
            civilite: Yup.string().required(),
            annee: Yup.string().required(),
            numero_rg: Yup.string().required()
          })}
          initialValues={{
            annee: "",
            civilite: "",
            numero_rg: "",
            type: ""
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
                <Box sx={{ zIndex: "100", position: "relative" }} mb="2">
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
                <Box sx={{ zIndex: "80", position: "relative" }} mb="2">
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
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.annee}
                    id="annee"
                    name="annee"
                    hasError={errors.annee && touched.annee}
                    onChange={handleChange}
                    placeholder="année"
                  />
                </Box>
                <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                  <Input
                    value={values.numero_rg}
                    id="numero_rg"
                    name="numero_rg"
                    hasError={errors.numero_rg && touched.numero_rg}
                    onChange={handleChange}
                    placeholder="numero rg"
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
