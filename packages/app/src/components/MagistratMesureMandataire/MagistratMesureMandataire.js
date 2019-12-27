import React, { useContext } from "react";

import { MesureContext } from "../MesureContext";
import { MagistratMesureMandataireContent } from "./MagistratMesureMandataireContent";
const MagistratMesureMandataire = () => {
  const { serviceId, mandataireId, tiId } = useContext(MesureContext);

  return (
    <MagistratMesureMandataireContent
      mandataireId={mandataireId}
      tiId={tiId}
      serviceId={serviceId}
    />
  );
};

export { MagistratMesureMandataire };
