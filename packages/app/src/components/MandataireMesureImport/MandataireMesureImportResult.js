import { Button, Heading2 } from "@socialgouv/emjpm-ui-core";
import { Text } from "@socialgouv/emjpm-ui-core/dist/Type";
import React, { Fragment } from "react";
import { Flex } from "rebass";

import { MandataireMesureImportErrors } from "./MandataireMesureImportErrors";
import { ServiceMesureImportResultStyle } from "./style";

const MandataireMesureImportResult = props => {
  const {
    result: { errors, mesures },
    reset
  } = props;

  return (
    <Fragment>
      <Flex alignItems="center" p={7} sx={ServiceMesureImportResultStyle}>
        <Flex flexDirection="column">
          <Heading2>{`Résultat de l'import`}</Heading2>
          <Text
            m={2}
            fontSize={2}
          >{`${mesures.length} mesures vont être importées ou mises à jour. Vous allez recevoir un email dans quelques instants.`}</Text>
          <Text
            m={2}
            fontSize={2}
          >{`${errors.length} mesures ne seront pas importées ou mises à jour. Les erreurs sont indiquées ci-dessous.`}</Text>
        </Flex>
        <Button variant="outline" onClick={reset}>
          Sélectionner un autre fichier
        </Button>
      </Flex>
      {errors.length > 0 && <MandataireMesureImportErrors errors={errors} />}
    </Fragment>
  );
};

export { MandataireMesureImportResult };
