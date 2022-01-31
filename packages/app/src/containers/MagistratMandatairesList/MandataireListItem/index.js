import { BuildingHouse } from "@styled-icons/boxicons-solid/BuildingHouse";
import { Female } from "@styled-icons/fa-solid/Female";
import { Male } from "@styled-icons/fa-solid/Male";
import { User } from "@styled-icons/fa-solid/User";
import { CheckShield } from "@styled-icons/boxicons-solid/CheckShield";
import { Star } from "@styled-icons/fa-solid/Star";
import { DotCircle } from "@styled-icons/fa-regular/DotCircle";
import { InfoCircle } from "@styled-icons/fa-solid/InfoCircle";
import { DotCircle as DotCircleSolid } from "@styled-icons/fa-solid/DotCircle";

import ReactTooltip from "react-tooltip";

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
import { useEffect } from "react";
import useUser from "~/hooks/useUser";

const extraIconsSize = 18;

const dispoDepartementInfoTip =
  "La disponibilité départementale est calculée à partir du nombre de mesures souhaitées par antennes et des mesures associées à ces antennes. Il est possible qu'une mesure ne soit associée à une antenne qu'au moment d'être accepté par le service, cela peut donc expliquer dans certain cas une dispo plus grande dans le département que globalement, cela correspond à l'écart des mesures en attente non encore associées à une antenne. Pour éviter cela vous pouvez désigner une antenne du service au moment de réserver la mesure.";

function getDispoInSelectedDepartement(service) {
  const { mesures_awaiting, mesures_max, mesures_in_progress } =
    service.service_antennes_aggregate.aggregate.sum;
  return mesures_max - ((mesures_awaiting || 0) + (mesures_in_progress || 0));
}

export default function MandataireListItem(props) {
  const { item } = props;
  const {
    gestionnaires,
    user_type: type,
    prefer,
    habilitation,
    available,
    distance,
  } = item;

  const [gestionnaire] = gestionnaires;
  const {
    mandataire,
    service,
    mesures_max,
    mesures_in_progress,
    mesures_awaiting,
    mesures_last_update,
  } = gestionnaire;

  const isService = type === "service";

  const suspendActivity = isService
    ? service.suspend_activity
    : mandataire.suspend_activity;

  const user = useUser();

  const currentAvailability = gestionnaire.remaining_capacity || 0;
  const dispoMax = gestionnaire.mesures_max || 0;
  const email = isService ? service.email : mandataire.user.email;
  const genre = isService ? null : mandataire.user.genre;
  const telephone =
    (isService ? service.telephone : mandataire.telephone) || "";
  const isAvailable = mesures_max < mesures_in_progress;
  const nom = capitalize((isService ? service.nom : mandataire.user.nom) || "");
  const prenom = capitalize(
    (isService ? service.prenom : mandataire.user.prenom) || ""
  );
  const codePostal =
    (isService ? service.code_postal : mandataire.code_postal) || "";
  const ville = capitalize(
    (isService ? service.ville : mandataire.ville) || ""
  );
  const etablissement = capitalize(
    (isService ? service.etablissement : "") || ""
  );
  const mesuresInProgress = mesures_in_progress;
  const mesuresAwaiting = mesures_awaiting;
  const mesuresLastUpdate = mesures_last_update;

  const defaultDepartement = user.magistrat.ti.departement_code;
  const { departementFilter } = props;
  const departementForLocalDispo = departementFilter || defaultDepartement;

  const dispoInSelectedDepartement = isService
    ? getDispoInSelectedDepartement(service)
    : null;

  const hasAntennes =
    isService && service.service_antennes_aggregate.aggregate.count > 0;
  const dispoInSelectedDepartementLabel = hasAntennes
    ? dispoInSelectedDepartement
    : "ND";

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      <Card sx={cardStyle} width="100%">
        <Box sx={decorationStyle(type)} />
        <Flex sx={MandatairelistStyle}>
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

            <Flex width="110px" sx={columnStyle(false, false)}>
              <Text sx={labelStyle}>
                {hasAntennes
                  ? `Dispo (${departementForLocalDispo}) / globale`
                  : "Disponibilité"}
              </Text>
              <div style={{ display: "inline" }}>
                {suspendActivity && (
                  <Text sx={dispoDescriptionStyle(false)}>{"Interrompu"}</Text>
                )}
                {!suspendActivity && (
                  <>
                    {hasAntennes && (
                      <>
                        <Text
                          sx={dispoDescriptionStyle(
                            dispoInSelectedDepartement > 0
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
                    {dispoInSelectedDepartement > currentAvailability && (
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

          <Flex sx={columnStyle(false, false)}>
            <Text sx={labelStyle}>En cours / Souhaitées</Text>
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
                aria-label={
                  habilitation
                    ? "Habilitation vérifiée"
                    : "Habilitation non vérifiée"
                }
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
                aria-label={
                  prefer
                    ? "Le mandataire souhaite recevoir des mesures en provenance de votre tribunal"
                    : "Le mandataire n'a pas exprimé son souhait de recevoir des mesures en provenance de votre tribunal"
                }
              />
              {!available && (
                <DotCircleSolid
                  size={extraIconsSize}
                  title={"Il n'y plus de places disponibles"}
                  color={"#FF6966"}
                  aria-label="Il n'y plus de places disponibles"
                />
              )}
              {available && (
                <DotCircle
                  size={extraIconsSize}
                  title={
                    "Il y a " + currentAvailability + " places disponibles"
                  }
                  color={"#70D54F"}
                  aria-label={
                    "Il y a " + currentAvailability + " places disponibles"
                  }
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
