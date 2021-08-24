import { Flex } from "rebass";

import { Button, Heading, Text } from "~/components";

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
          <Heading size={2}>{"Résultat de l'import"}</Heading>
          {!invalidAntenneNames.length && (
            <>
              {errors.length ? (
                <Text
                  m={2}
                  fontSize={2}
                >{`Erreur lors de l'import des mesures (${
                  errors.length
                } erreurs sur ${
                  errors.length + creationNumber + updateNumber
                } mesures). Aucune mesure n'a été importée.`}</Text>
              ) : (
                <Text m={2} fontSize={2}>{`${
                  creationNumber + updateNumber
                } mesures ont été importées (${creationNumber} nouvelles et ${updateNumber} mises à jour).`}</Text>
              )}
            </>
          )}
        </Flex>
        {!invalidAntenneNames.length && (
          <Button variant="outline" onClick={reset}>
            Sélectionner un autre fichier
          </Button>
        )}
      </Flex>
      {!!errors.length && <MesureImportErrors errors={errors} />}
      {!!invalidAntenneNames.length && (
        <ServiceMesureAntennesMatcher
          serviceId={serviceId}
          invalidAntenneNames={invalidAntenneNames}
          onSubmitAntennesMap={onSubmitAntennesMap}
          reset={reset}
        />
      )}
    </div>
  );
};

export { MesureImportResult };
