import { BuildingHouse } from "@styled-icons/boxicons-solid/BuildingHouse";
import { Female } from "@styled-icons/fa-solid/Female";
import { Male } from "@styled-icons/fa-solid/Male";
import { CheckShield } from "@styled-icons/boxicons-solid/CheckShield";
import { Star } from "@styled-icons/fa-solid/Star";
import { DotCircle } from "@styled-icons/fa-regular/DotCircle";
import { DotCircle as DotCircleSolid } from "@styled-icons/fa-solid/DotCircle";

import { Box, Flex } from "rebass";
import { stdFormatter } from "@emjpm/biz";

import { Card, Text } from "~/components";
import {
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

import capitalize from "~/utils/std/capitalize";

const extraIconsSize = 18;

export default function MandataireListItem(props) {
  const { item } = props;
  const {
    gestionnaire,
    user_type: type,
    prefer,
    habilitation,
    available,
    distance,
  } = item;
  const {
    mandataire,
    service,
    mesures_max,
    mesures_in_progress,
    mesures_awaiting,
    mesures_last_update,
  } = gestionnaire;
  const currentAvailability = gestionnaire.remaining_capacity || 0;
  const dispoMax = gestionnaire.mesures_max || 0;
  const isService = type === "service";
  const email = isService ? service.email : mandataire.user.email;
  const genre = isService ? service.genre : mandataire.genre;
  const telephone =
    (isService ? service.telephone : mandataire.telephone) || "";
  const isAvailable = mesures_max < mesures_in_progress;
  const nom = capitalize((isService ? service.nom : mandataire.user.nom) || "");
  const prenom = capitalize(
    (isService ? service.prenom : mandataire.user.prenom) || ""
  );
  const codePostal = capitalize(
    (isService ? service.code_postal : mandataire.code_postal) || ""
  );
  const ville = capitalize(
    (isService ? service.ville : mandataire.ville) || ""
  );
  const etablissement = capitalize(
    (isService ? service.etablissement : "") || ""
  );
  const mesuresInProgress = mesures_in_progress;
  const mesuresAwaiting = mesures_awaiting;
  const mesuresLastUpdate = mesures_last_update;
  return (
    <>
      <Card sx={cardStyle} width="100%">
        <Box sx={decorationStyle(type)} />
        <Flex sx={MandatairelistStyle}>
          <Flex>
            <Box alignSelf="center" my="1px" mr="1">
              {type === "service" ? (
                <BuildingHouse size="24" />
              ) : (
                <>{genre === "F" ? <Female size="24" /> : <Male size="24" />}</>
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
            <Text sx={labelStyle}>Localisation</Text>
            <Text sx={descriptionStyle}>{`${codePostal} ${ville}`}</Text>
          </Flex>

          <>
            <Flex width="180px" sx={columnStyle(true, true)}>
              <Text sx={labelStyle}>Email</Text>
              <Text sx={descriptionStyle}>{email}</Text>
            </Flex>
            <Flex width="100px" sx={columnStyle(true, true)}>
              <Text sx={labelStyle}>Téléphone</Text>
              <Text sx={descriptionStyle}>{telephone}</Text>
            </Flex>
            <Flex width="70px" sx={columnStyle(false, false)}>
              <Text sx={labelStyle}>En attente</Text>
              <Text sx={descriptionStyle}>{mesuresAwaiting}</Text>
            </Flex>
            <Flex width="70px" sx={columnStyle(false, false)}>
              <Text sx={labelStyle}>Disponibilité</Text>
              <Text sx={dispoDescriptionStyle(currentAvailability > 0)}>
                {currentAvailability}
              </Text>
            </Flex>
          </>

          <Flex sx={columnStyle(false, false)}>
            <Text sx={labelStyle}>En cours / souhaitée</Text>
            <Text sx={dispoDescriptionStyle(currentAvailability > 0)}>
              {mesuresInProgress}/ {dispoMax}
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

          {distance && (
            <Flex sx={columnStyle(false, false)}>
              <Text sx={labelStyle}>Distance</Text>
              <Text sx={lastUpdateStyle()}>
                {Math.round(distance * 10) / 10} KM
              </Text>
            </Flex>
          )}

          <Flex alignItems="center">
            <Box>
              <Text sx={labelStyle} style={{ textAlign: "center" }}>
                eMJPM
              </Text>
              <CheckShield
                size={extraIconsSize}
                title={
                  habilitation
                    ? "Habilitation vérifiée"
                    : "Habilitation non vérifiée"
                }
                color={habilitation ? "#70D54F" : ""}
              />
              <Star
                size={extraIconsSize}
                title={
                  prefer
                    ? "Le mandataire souhaite recevoir des mesures en provenance de votre tribunal"
                    : "Le mandataire n'a pas exprimé son souhait de recevoir des mesures en provenance de votre tribunal"
                }
                color={prefer ? "#70D54F" : ""}
              />
              {!available && (
                <DotCircleSolid
                  size={extraIconsSize}
                  title={"Il n'y plus de places disponibles"}
                  color={"#FF6966"}
                />
              )}
              {available && (
                <DotCircle
                  size={extraIconsSize}
                  title={
                    "Il y a " + currentAvailability + " places disponibles"
                  }
                  color={"#70D54F"}
                />
              )}
            </Box>
          </Flex>
          <Flex alignItems="center"></Flex>
        </Flex>
      </Card>
    </>
  );
}
