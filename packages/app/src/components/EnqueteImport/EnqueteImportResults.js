import { Button, Heading2, Text } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Flex } from "rebass";

import { EnqueteImportErrors } from "./EnqueteImportErrors";
import { ServiceEnqueteImportResultStyle } from "./style";

const EnqueteImportResults = props => {
  const { errors, enquete, reset } = props;

  return (
    <Fragment>
      <Flex alignItems="center" p={7} sx={ServiceEnqueteImportResultStyle}>
        <Flex flexDirection="column">
          <Heading2>{`Résultat de l'import`}</Heading2>
          <Text
            m={2}
            fontSize={2}
          >{`${enquete.length} enquete vont être importées ou mises à jour. Vous allez recevoir un email dans quelques instants.`}</Text>
          <Text
            m={2}
            fontSize={2}
          >{`${errors.length} enquete ne seront pas importées ou mises à jour. Les erreurs sont indiquées ci-dessous.`}</Text>
        </Flex>
        <Button variant="outline" onClick={reset}>
          Sélectionner un autre fichier
        </Button>
      </Flex>
      {errors.length > 0 && <EnqueteImportErrors errors={errors} />}
    </Fragment>
  );
};

export { EnqueteImportResults };
