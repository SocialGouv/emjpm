import { useMutation } from "@apollo/react-hooks";
import { Button, Text } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { validateImportData } from "../../util/import";
import { MesureImportFilepicker } from "./MesureImportFilepicker";
import { ADD_SERVICE_IMPORT } from "./mutations";

const MesureImportService = props => {
  const { id } = props;
  const [addImport] = useMutation(ADD_SERVICE_IMPORT);
  const [state, setState] = useState(null);

  const handleReset = () => {
    setState(null);
  };

  const handleChange = async ({ data, file }) => {
    const { errors, mesures } = validateImportData(data);

    setState({ errors, file, mesures });
  };

  const handleSubmit = async () => {
    const { file, mesures } = state;

    await addImport({
      variables: {
        content: mesures,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        service_id: id
      }
    });
  };

  if (!state) {
    return <MesureImportFilepicker handleChange={handleChange} />;
  }

  const { mesures, errors } = state;

  return (
    <Box>
      <Button mb={4} variant="outline" onClick={handleReset}>
        Sélectionner un autre fichier
      </Button>
      {errors.length && (
        <Box mb={4}>
          <Text color="warning" fontSize={2} fontWeight="bold" mb={1}>
            {`${errors.length} mesures ne peuvent pas être importées ou mises à jour`}
          </Text>
          <Text color="textSecondary" fontSize={1} mb={2}>
            Les erreurs sont indiquées ci-dessous.
          </Text>
          {errors.map(error => (
            <Flex key={error.message} mb={1}>
              <Text color="wargnin" mr={1}>
                LIGNE {error.line}
              </Text>
              <Text>{error.message}</Text>
            </Flex>
          ))}
        </Box>
      )}
      {mesures.length && (
        <Box mb={2}>
          <Box mb={2}>
            <Text color="primary" fontSize={2} fontWeight="bold" mb={1}>
              {`${mesures.length} mesures peuvent être importées ou mises à jour`}
            </Text>
            <Text color="textSecondary" fontSize={1} mb={4}>
              {`Vous recevrez un email de confirmation à la fin de l'import.`}
            </Text>
          </Box>
          <Button onClick={handleSubmit}>{`Importez ${mesures.length} mesures`}</Button>
        </Box>
      )}
    </Box>
  );
};

export { MesureImportService };
