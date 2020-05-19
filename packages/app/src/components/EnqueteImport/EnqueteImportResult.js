import { Button, Heading2, Text } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { EnqueteImportErrors } from "./EnqueteImportErrors";
import { ServiceEnqueteImportResultStyle } from "./style";

const EnqueteImportResult = ({
  reset,
  importSummary: { creationNumber, updateNumber, errors }
}) => {
  return (
    <div p={7} sx={ServiceEnqueteImportResultStyle}>
      <Flex alignItems="center">
        <Flex flexDirection="column">
          <Heading2>{`Résultat de l'import`}</Heading2>
          {errors.length ? (
            <Text m={2} fontSize={2}>{`Erreur lors de l'import des enquete (${
              errors.length
            } erreurs sur ${errors.length +
              creationNumber +
              updateNumber} enquete). Aucune enquete n'a été importée.`}</Text>
          ) : (
            <Text m={2} fontSize={2}>{`${creationNumber +
              updateNumber} enquete ont été importées (${creationNumber} nouvelles et ${updateNumber} mises à jour).`}</Text>
          )}
        </Flex>
        <Button variant="outline" onClick={reset}>
          Sélectionner un autre fichier
        </Button>
      </Flex>
      {!!errors.length && <EnqueteImportErrors errors={errors} />}
    </div>
  );
};

export { EnqueteImportResult };
