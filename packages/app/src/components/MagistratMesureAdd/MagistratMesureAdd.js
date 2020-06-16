import React from "react";
import { Box } from "rebass";

import { formatGestionnaireId } from "../../../src/util/mandataires";
import { MagistratMesureMandataireTitle } from "../MagistratMesureMandataireTitle";
import { MagistratMesureServiceTitle } from "../MagistratMesureServiceTitle";
import { MagistratMesureAddForm } from "./MagistratMesureAddForm";
import { MagistratMandataireStyle } from "./style";

const MagistratMesureAdd = (props) => {
  const { gestionnaireId } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);
  const cancelActionRoute = gestionnaireId
    ? {
        href: "/magistrats/gestionnaires/[gestionnaire_id]",
        as: `/magistrats/gestionnaires/${gestionnaireId}`,
      }
    : {
        href: `/magistrats`,
        as: `/magistrats`,
      };

  return (
    <Box>
      {serviceId && <MagistratMesureServiceTitle id={serviceId} />}
      {mandataireId && <MagistratMesureMandataireTitle id={mandataireId} />}
      <Box sx={MagistratMandataireStyle} {...props}>
        <MagistratMesureAddForm
          gestionnaireId={gestionnaireId}
          mandataireId={mandataireId}
          serviceId={serviceId}
          cancelActionRoute={cancelActionRoute}
        />
      </Box>
    </Box>
  );
};

export { MagistratMesureAdd };
