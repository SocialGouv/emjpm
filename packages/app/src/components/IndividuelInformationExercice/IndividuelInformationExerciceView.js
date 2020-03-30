import { Button, Heading4 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import {
  INTERVALLE_ETP_OPTIONS,
  SECRETARIAT_OPTIONS,
  YES_NO_OPTIONS
} from "../../constants/mandataire";
import { FieldLabelValue, getLabel } from "../IndividuelInformationCommon";

const IndividuelInformationExerciceView = props => {
  const { exercice, handleEdit } = props;

  return (
    <Fragment>
      <Box>
        <Heading4 mb={1}>{"Activité de mandataire individuel"}</Heading4>
        <FieldLabelValue
          label="Estimation de l'activité de mandataire individuel en ETP"
          value={getLabel(exercice.estimation_etp, INTERVALLE_ETP_OPTIONS)}
        />
      </Box>
      <Box>
        <Heading4 mb={1}>{"Secretariat spécialisé"}</Heading4>
        <FieldLabelValue
          label="Exercez-vous avec un secretariat spécialisé?"
          value={getLabel(exercice.secretaire_specialise, SECRETARIAT_OPTIONS)}
        />
        {exercice.secretaire_specialise && (
          <FieldLabelValue
            label="Estimation de l'activité en ETP du secrétaire spécialisé"
            value={getLabel(exercice.secretaire_specialise_etp, INTERVALLE_ETP_OPTIONS)}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que préposé d'établissement"}</Heading4>
        <FieldLabelValue
          label="Situation de cumul en tant que préposé d'établissement"
          value={getLabel(exercice.cumul_prepose, YES_NO_OPTIONS)}
        />
        {exercice.cumul_prepose && (
          <FieldLabelValue
            label="ETP consacré au cumul en tant que préposé"
            value={getLabel(exercice.cumul_prepose_etp, INTERVALLE_ETP_OPTIONS)}
          />
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que délégué d'une service"}</Heading4>
        <FieldLabelValue
          label="Situation de cumul en tant que délégué d'une service"
          value={getLabel(exercice.cumul_delegue_service, YES_NO_OPTIONS)}
        />
        {exercice.cumul_delegue_service && (
          <FieldLabelValue
            label="ETP consacré au cumul en tant que délégué d'un service mandataire"
            value={getLabel(exercice.cumul_delegue_service_etp, INTERVALLE_ETP_OPTIONS)}
          />
        )}
      </Box>
      <Flex mt="5">
        <Box>
          <Button onClick={handleEdit}>Modifier</Button>
        </Box>
      </Flex>
    </Fragment>
  );
};

export { IndividuelInformationExerciceView };
