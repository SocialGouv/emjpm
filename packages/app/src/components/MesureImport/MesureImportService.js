import { useMutation } from "@apollo/react-hooks";
import { Button, Select, Text } from "@socialgouv/emjpm-ui-core";
import React, { useMemo, useState } from "react";
import { Box, Flex } from "rebass";

import { validateImportData } from "../../util/import";
import { MesureImportFilepicker } from "./MesureImportFilepicker";
import { ADD_SERVICE_IMPORT } from "./mutations";

const initialState = {
  uploaded: false,
  imported: false
};

const MesureImportService = props => {
  const { serviceId, serviceAntennes } = props;
  const antenneNames = serviceAntennes.map(({ name }) => name);
  const antenneOptions = serviceAntennes.map(a => ({ label: a.name, value: a.id }));
  const [state, setState] = useState(initialState);
  const [addImport] = useMutation(ADD_SERVICE_IMPORT);

  const invalidAntenneNames = useMemo(() => {
    if (!state.mesures) {
      return [];
    }

    return state.mesures
      .map(({ antenne }) => antenne)
      .filter(Boolean)
      .filter((a, pos, arr) => arr.indexOf(a) === pos)
      .filter(a => !antenneNames.includes(a));
  }, [antenneNames, state]);

  const handleReset = () => {
    setState(initialState);
  };

  const handleFileChange = async ({ data, file }) => {
    const { errors, mesures } = validateImportData(data);
    setState({
      ...state,
      errors,
      file,
      mesures,
      uploaded: true
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { file, mesures } = state;

    // get associations via select values
    const invalidAntenneAssociations = invalidAntenneNames.reduce((acc, a, i) => {
      acc[a] = event.target.elements[`select-${i}`].value;
      return acc;
    }, {});

    // associate mesures antenne_id
    const mesureWithAntenneIds = mesures.map(mesure => {
      const antenne = serviceAntennes.find(a => {
        const name = invalidAntenneNames.includes(a.name)
          ? invalidAntenneAssociations[mesure.antenne]
          : mesure.antenne;
        return a.name === name;
      });

      const { id: antenne_id } = antenne || {};

      return {
        ...mesure,
        antenne_id
      };
    });

    await addImport({
      variables: {
        content: mesureWithAntenneIds,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        service_id: serviceId
      }
    });

    setState({
      ...state,
      imported: true
    });
  };

  if (!state.uploaded) {
    return <MesureImportFilepicker handleChange={handleFileChange} />;
  }

  const { mesures, errors, imported } = state;

  return (
    <Box>
      <Button mb={4} variant="outline" onClick={handleReset}>
        Sélectionner un autre fichier
      </Button>
      {imported ? (
        <Box mb={2}>
          <Text fontWeight="bold" color="primary" mb={1}>
            Vos mesures ont été importées.{" "}
          </Text>
          <Text color="textSecondary" width="50%">
            Vous allez reçevoir un email de confirmation sous peu.
          </Text>
        </Box>
      ) : (
        <Box>
          {!!errors.length && (
            <Box mb={4}>
              <Text color="warning" fontSize={2} fontWeight="bold" mb={1}>
                {`${errors.length} mesures ne peuvent pas être importées ou mises à jour`}
              </Text>
              <Text color="textSecondary" fontSize={1} mb={2}>
                Les erreurs sont indiquées ci-dessous sont facultatives et
              </Text>
              {errors.map(({ line = 0, message }) => (
                <Flex key={`${line}-${message}`} mb={1}>
                  <Text color="warning" mr={1}>
                    LIGNE {line}
                  </Text>
                  <Text>{message}</Text>
                </Flex>
              ))}
            </Box>
          )}
          {!!mesures.length && (
            <Box mb={2}>
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <Text color="primary" fontSize={2} fontWeight="bold" mb={1}>
                    {`${mesures.length} mesures peuvent être importées ou mises à jour`}
                  </Text>
                </Box>
                {!!invalidAntenneNames.length && (
                  <Box mb={4}>
                    <Text color="textSecondary" mb={4} width="50%" lineHeight={1.5}>
                      {`Certaines antennes ne sont pas reconnues, associez les à des antennes eMJPM existantes pour continuer l'import.`}
                    </Text>
                    {invalidAntenneNames.map((antenne, index) => (
                      <Flex key={antenne} mb={1} alignItems="center">
                        <Box color="primary" width={100}>
                          {antenne}
                        </Box>
                        <Box width={100} color="textSecondary">
                          correspond à
                        </Box>
                        <Box width={200}>
                          <Select
                            name={`select-${index}`}
                            isSearchable={false}
                            defaultValue={antenneOptions[0]}
                            placeholder
                            options={antenneOptions}
                            size="small"
                          />
                        </Box>
                      </Flex>
                    ))}
                  </Box>
                )}
                <Button type="submit" mb={1}>{`Importez ${mesures.length} mesures`}</Button>
                <Text color="textSecondary" fontSize={1} mb={4}>
                  {`Vous recevrez un email de confirmation à la fin de l'import.`}
                </Text>
              </form>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export { MesureImportService };
