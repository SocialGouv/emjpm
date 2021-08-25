import { Flex } from "rebass";

import { Button, Heading, Text } from "~/components";

import { MesureImportErrors } from "./MesureImportErrors";
import { ServiceMesureAntennesMatcher } from "./ServiceMesureAntennesMatcher";
import { ServiceMesureImportResultStyle } from "./style";

import { toast } from "react-toastify";
import { useEffect } from "react";

const MesureImportResult = ({
  reset,
  importSummary: {
    creationNumber,
    updateNumber,
    errors,
    warnings,
    invalidAntenneNames,
  },
  serviceId,
  onSubmitAntennesMap,
}) => {
  useEffect(() => {
    for (const error of warnings) {
      switch (error.type) {
        case "doublons":
          toast.warn(
            "Votre import contient " +
              error.count +
              " doublon" +
              (error.count > 1 ? "s" : "") +
              ", il est possible que vous perdiez des données lors de l'import, veillez à n'avoir qu'un Numéro RG unique par mesure et par tribunal."
          );
          break;
      }
    }
  }, [warnings]);

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
