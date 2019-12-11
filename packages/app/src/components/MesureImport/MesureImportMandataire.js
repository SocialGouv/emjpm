import React from "react";

import { MesureImport } from "./MesureImport";
import { ADD_MANDATAIRE_IMPORT } from "./mutations";

const MesureImportMandataire = props => {
  const { id } = props;
  const variables = { user_id: parseInt(id) };

  return <MesureImport mutation={ADD_MANDATAIRE_IMPORT} variables={variables} />;
};

export { MesureImportMandataire };
