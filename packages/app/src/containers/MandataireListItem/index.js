import { BuildingHouse } from "@styled-icons/boxicons-solid/BuildingHouse";
import { Female } from "@styled-icons/fa-solid/Female";
import { Male } from "@styled-icons/fa-solid/Male";
import { User } from "@styled-icons/fa-solid/User";
import { InfoCircle } from "@styled-icons/fa-solid/InfoCircle";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import { Box, Flex } from "rebass";
import { stdFormatter } from "@emjpm/biz";

import { Card, Text } from "~/components";
import {
  availabilityIndicatorStyle,
  cardStyle,
  columnStyle,
  lastUpdateStyle,
  decorationStyle,
  descriptionStyle,
  dispoDescriptionStyle,
  labelStyle,
  MandatairelistStyle,
  subtitleStyle,
  titleStyle,
} from "./style";
import { useEffect } from "react";

const dispoDepartementInfoTip =
  "La disponibilité départementale est calculée à partir du nombre de mesures souhaitées par antennes et des mesures associées à ces antennes. Il est possible qu'une mesure ne soit associée à une antenne qu'au moment d'être accepté par le service, cela peut donc expliquer dans certain cas une dispo plus grande dans le département que globalement, cela correspond à l'écart des mesures en attente non encore associées à une antenne. Pour éviter cela le magistrat peut désigner une antenne du service au moment de réserver la mesure.";

function getDispoInSelectedDepartement(service) {
  const { mesures_awaiting, mesures_max, mesures_in_progress } =
    service.service_antennes_aggregate.aggregate.sum;
  return mesures_max - ((mesures_awaiting || 0) + (mesures_in_progress || 0));
}

export default function MandataireListItem(props) {
  const {
    gestionnaire: {
      currentAvailability,
      dispoMax,
      email,
      genre,
      telephone,
      isAvailable,
      nom,
      prenom,
      ville,
      codePostal,
      etablissement,
      mesuresInProgress,
      mesuresAwaiting,
      mesuresLastUpdate,
      type,
      service,
      suspendActivity,
    },
    isMagistratMap,
    isGreffierMap,
    onClick,
    departementFilter,
    accessibilityProps,
    tag,
  } = props;

  const isService = type === "service";

  let hasAntennes;
  let dispoInSelectedDepartement;
  let dispoInSelectedDepartementLabel;
  if (isService) {
    const { service_antennes_aggregate } = service;
    if (service_antennes_aggregate) {
      hasAntennes = service.service_antennes_aggregate.aggregate.count > 0;
      dispoInSelectedDepartement = isService
        ? getDispoInSelectedDepartement(service)
        : null;
      dispoInSelectedDepartementLabel = hasAntennes
        ? dispoInSelectedDepartement
        : "ND";
    }
  }

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <Card
        sx={cardStyle}
        width="100%"
        as={tag ? tag : "button"}
        {...accessibilityProps}
        tabIndex="0"
      >
        <Box sx={decorationStyle(type)} />

        <Flex
          onClick={(e) => {
            onClick && onClick(e, props);
          }}
          sx={MandatairelistStyle}
        >
          <Flex>
            <Box alignSelf="center" my="1px" mr="1">
              {type === "service" ? (
                <BuildingHouse
                  size="24"
                  aria-hidden="false"
                  role="img"
                  aria-label="Service"
                />
              ) : (
                <>
                  {genre === "F" && (
                    <Female
                      size="24"
                      aria-hidden="false"
                      role="img"
                      aria-label="Madame"
                    />
                  )}
                  {genre === "H" && (
                    <Male
                      size="24"
                      aria-hidden="false"
                      role="img"
                      aria-label="Monsieur"
                    />
                  )}
                  {!genre && (
                    <User
                      size="16"
                      aria-hidden="false"
                      role="img"
                      aria-label="Genre inconnu"
                      style={{ margin: "0 5px" }}
                    />
                  )}
                </>
              )}
              {isAvailable}
            </Box>
            <Box>
              <Text sx={titleStyle}>
                {type === "service" ? (
                  <>{etablissement}</>
                ) : (
                  <>
                    {nom} {prenom}
                  </>
                )}
              </Text>
              <Text sx={subtitleStyle}>{type}</Text>
            </Box>
          </Flex>
          <Flex width="100px" sx={columnStyle(true, true)}>
            <Text sx={labelStyle}>location</Text>
            <Text sx={descriptionStyle}>{`${codePostal} ${ville}`}</Text>
          </Flex>

          {!(isMagistratMap || isGreffierMap) && (
            <>
              <Flex width="200px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Email</Text>
                <Text sx={descriptionStyle}>{email}</Text>
              </Flex>
              <Flex width="100px" sx={columnStyle(true, true)}>
                <Text sx={labelStyle}>Téléphone</Text>
                <Text sx={descriptionStyle}>{telephone}</Text>
              </Flex>
              <Flex width="90px" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>En attente</Text>
                <Text sx={descriptionStyle}>{mesuresAwaiting}</Text>
              </Flex>
              <Flex width="110px" sx={columnStyle(false, false)}>
                <Text sx={labelStyle}>
                  {departementFilter && hasAntennes
                    ? `Dispo (${departementFilter}) / globale`
                    : "Disponibilité"}
                </Text>
                <div>
                  {suspendActivity && (
                    <Text sx={dispoDescriptionStyle(false)}>
                      {"Interrompu"}
                    </Text>
                  )}
                  {!suspendActivity && (
                    <>
                      {departementFilter && hasAntennes && (
                        <>
                          <Text
                            sx={dispoDescriptionStyle(
                              dispoInSelectedDepartementLabel > 0
                            )}
                            style={{ display: "inline" }}
                          >
                            {dispoInSelectedDepartementLabel}
                          </Text>
                          {" / "}
                        </>
                      )}
                      <Text
                        sx={dispoDescriptionStyle(currentAvailability > 0)}
                        style={{ display: "inline" }}
                      >
                        {currentAvailability}
                      </Text>{" "}
                      {dispoInSelectedDepartementLabel >
                        currentAvailability && (
                        <div
                          style={{ display: "inline" }}
                          data-tip={dispoDepartementInfoTip}
                        >
                          <InfoCircle color="#818181" size={11} />{" "}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Flex>
            </>
          )}

          <Flex sx={columnStyle(false, false)}>
            <Text sx={labelStyle}>En cours / souhaitée</Text>
            <Text
              sx={dispoDescriptionStyle(
                !suspendActivity && currentAvailability > 0
              )}
            >
              {mesuresInProgress} / {suspendActivity ? "Interrompu" : dispoMax}
            </Text>
          </Flex>

          <Flex sx={columnStyle(false, false)}>
            <Text sx={labelStyle}>Dernière mise à jour</Text>
            <Text sx={lastUpdateStyle()}>
              {mesuresLastUpdate
                ? stdFormatter.formatDateUI(mesuresLastUpdate)
                : "Non renseignée"}
            </Text>
          </Flex>

          <Flex alignItems="center">
            <Box sx={availabilityIndicatorStyle(currentAvailability > 0)} />
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

MandataireListItem.defaultProps = {
  isMagistratMap: false,
  onClick: null,
};

MandataireListItem.propTypes = {
  gestionnaire: PropTypes.shape({
    codePostal: PropTypes.string,
    currentAvailability: PropTypes.number.isRequired,
    dispoMax: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    etablissement: PropTypes.string,
    genre: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    mesuresAwaiting: PropTypes.number,
    mesuresInProgress: PropTypes.number,
    nom: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    prenom: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ville: PropTypes.string.isRequired,
  }).isRequired,
  isMagistratMap: PropTypes.bool,
  isGreffierMap: PropTypes.bool,
  onClick: PropTypes.func,
  accessibilityProps: PropTypes.shape({
    role: PropTypes.string.isRequired,
    "aria-label": PropTypes.string.isRequired,
    "aria-pressed": PropTypes.string.isRequired,
  }),
};
