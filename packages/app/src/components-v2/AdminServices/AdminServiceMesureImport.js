import React from "react";

import { MesureImport } from "../../components-v2/MesureImport";

const AdminServiceMesureImport = props => {
  const { id } = props;
  const variables = { service_id: parseInt(id) };

  return <MesureImport variables={variables} />;
};

export { AdminServiceMesureImport };
