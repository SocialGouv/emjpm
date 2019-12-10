import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";

import { validateImportData } from "../../util/import";
import { MesureImportFilepicker } from "./MesureImportFilepicker";
import { MesureImportResults } from "./MesureImportResults";
import { ADD_IMPORT } from "./mutations";

const INITIAL_STATE = {
  errors: [],
  mesures: []
};

const MesureImport = props => {
  const { variables } = props;
  const [state, setState] = useState(INITIAL_STATE);
  const [addImport] = useMutation(ADD_IMPORT);

  const handleReset = () => {
    setState(INITIAL_STATE);
  };

  const handleChange = ({ data, file }) => {
    const { errors, mesures } = validateImportData(data);

    if (errors.length) {
      setState({ ...state, errors });
      return;
    }

    setState({ ...state, mesures });

    addImport({
      variables: {
        content: mesures,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        ...variables
      }
    });
  };

  const { errors, mesures } = state;

  if (errors.length || mesures.length) {
    return <MesureImportResults reset={handleReset} errors={errors} mesures={mesures} />;
  } else {
    return <MesureImportFilepicker handleChange={handleChange} />;
  }
};

export { MesureImport };
