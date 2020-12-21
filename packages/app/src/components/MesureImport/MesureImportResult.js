import React from "react";
import { Flex } from "rebass";

import { Button, Heading2, Text } from "~/ui";

import { MesureImportErrors } from "./MesureImportErrors";
import { ServiceMesureAntennesMatcher } from "./ServiceMesureAntennesMatcher";
import { ServiceMesureImportResultStyle } from "./style";

const MesureImportResult = ({
  reset,
  importSummary: { creationNumber, updateNumber, errors, invalidAntenneNames },
  serviceId,
  onSubmitAntennesMap,
}) => {
  return (
    <div p={7} sx={ServiceMesureImportResultStyle}>
      <Flex alignItems="center">
        <Flex flexDirection="column">
          <Heading2>{`Résultat de l'import`}</Heading2>
          {errors.length ? (
            <Text m={2} fontSize={2}>{`Erreur lors de l'import des mesures (${
              errors.length
            } erreurs sur ${
              errors.length + creationNumber + updateNumber
            } mesures). Aucune mesure n'a été importée.`}</Text>
          ) : (
            <Text m={2} fontSize={2}>{`${
              creationNumber + updateNumber
            } mesures ont été importées (${creationNumber} nouvelles et ${updateNumber} mises à jour).`}</Text>
          )}
        </Flex>
        <Button variant="outline" onClick={reset}>
          Sélectionner un autre fichier
        </Button>
      </Flex>
      {!!errors.length && <MesureImportErrors errors={errors} />}
      {!!invalidAntenneNames.length && (
        <ServiceMesureAntennesMatcher
          serviceId={serviceId}
          invalidAntenneNames={invalidAntenneNames}
          onSubmitAntennesMap={onSubmitAntennesMap}
        />
      )}
    </div>
  );
};

export { MesureImportResult };
