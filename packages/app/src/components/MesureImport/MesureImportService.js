import React from "react";

import { MesureImport } from "./MesureImport";
import { ADD_SERVICE_IMPORT } from "./mutations";

const MesureImportService = props => {
  const { id } = props;
  const variables = { service_id: parseInt(id) };

  return <MesureImport mutation={ADD_SERVICE_IMPORT} variables={variables} />;
};

export { MesureImportService };
