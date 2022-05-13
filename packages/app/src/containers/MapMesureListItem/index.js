import styled from "@emotion/styled";
import { Female } from "@styled-icons/fa-solid/Female";
import { Male } from "@styled-icons/fa-solid/Male";
import { Warning } from "@styled-icons/material/Warning";
import { ExclamationCircle } from "@styled-icons/fa-solid/ExclamationCircle";

import { Box, Flex } from "rebass";

import { Card, Text } from "~/components";
import { isMonsieur } from "@emjpm/biz";
import { MESURE_TYPE } from "~/containers/MesureListItem/constants/type";
import {
  cardStyle,
  columnStyle,
  decorationStyle,
  descriptionStyle,
  labelStyle,
  mesureListItemStyle,
  natureStyle,
  statusStyle,
  titleStyle,
} from "~/containers/MesureListItem/style";

const GrayMale = styled(Male)`
  color: "#333333";
`;

const GrayFemale = styled(Female)`
  color: "#333333";
`;

const StyledExclamationCircle = styled(ExclamationCircle)`
  color: #df1400;
`;

const currentYear = new Date().getFullYear();

export default function MapMesureListItem(props) {
  const {
    mesure: {
      id,
      age,
      cabinet,
      civilite,
      champMesure,
      dateNominationFormated,
      isUrgent,
      judgmentDate,
      numeroDossier,
      numeroRg,
      status,
      tribunal,
      natureMesure,
      ville,
    },
    onClick,
    getHref,
    url,
  } = props;

  const currentStatus = status;

  const numeroRgIsValid = numeroRg.length === 8;

  return (
    <>
      <Card
        sx={{ ...cardStyle, display: "block" }}
        width="100%"
        as="a"
        href={`${url}/${id}`}
        title={`${natureMesure || ""} ${champMesure || ""} ${numeroRg}`}
        aria-label={`${natureMesure || ""} ${champMesure || ""} ${numeroRg}`}
      >
        <Box sx={decorationStyle(status)} />
        <Flex sx={mesureListItemStyle}>
          <Box minWidth="220px" maxWidth="220px" mr="1">
            <Text sx={titleStyle}>
              {!numeroRgIsValid && (
                <div
                  style={{ display: "inline" }}
                  data-multiline={true}
                  data-tip={
                    "Le Numéro RG de cette mesure est invalide,  il est probable qu'elle soit doublonnée.<br />" +
                    "Veuillez corriger cette anomalie afin que les fonctions d'imports <br />(OCMI, éditeur tiers de logiciel utilisant notre API, import fichier) puissent fonctionner correctement."
                  }
                >
                  <StyledExclamationCircle size="12" />
                </div>
              )}{" "}
              {numeroRg || ""}{" "}
              <Text sx={statusStyle(status)}>{currentStatus || ""}</Text>
            </Text>
            <Text sx={natureStyle}>{`${natureMesure} ${
              champMesure || ""
            }`}</Text>
          </Box>

          <Flex minWidth="70px" mr="1">
            <Box alignSelf="center" pt="4px" mr="1">
              {civilite && (
                <>
                  {isMonsieur({ civilite }) ? (
                    <GrayMale
                      size="24"
                      role="img"
                      aria-label="Monsieur"
                      aria-hidden="false"
                    />
                  ) : (
                    <GrayFemale
                      size="24"
                      role="img"
                      aria-label="Madame"
                      aria-hidden="false"
                    />
                  )}
                </>
              )}
            </Box>
            <Box>
              <Text sx={labelStyle}>Age</Text>
              <Text sx={descriptionStyle}>{currentYear - age || "nc"}</Text>
            </Box>
          </Flex>

          <Flex minWidth="280px" maxWidth="280px" sx={columnStyle(true, true)}>
            <Text sx={labelStyle}>Commune</Text>
            <Text sx={descriptionStyle}>{ville || ""}</Text>
          </Flex>

          {status === MESURE_TYPE.WAITING && (
            <>
              <Flex
                sx={columnStyle(false, false)}
                minWidth="130px"
                maxWidth="130px"
                textAlign="left"
              >
                <Text sx={labelStyle}>Date prév. juge.</Text>
                <Text sx={descriptionStyle}>{judgmentDate || ""}</Text>
              </Flex>
              <Flex
                minWidth="100px"
                maxWidth="100px"
                style={{ marginLeft: "5px" }}
              >
                <Box alignSelf="center" pt="4px" mr="1">
                  <>
                    {(isUrgent || 21) && (
                      <Flex alignItems="center">
                        <Warning size="24" />
                        <Text
                          sx={descriptionStyle}
                          style={{ marginLeft: "5px" }}
                        >
                          Urgent
                        </Text>
                      </Flex>
                    )}
                  </>
                </Box>
              </Flex>
            </>
          )}

          {status !== MESURE_TYPE.WAITING && (
            <Flex
              textAlign="left"
              sx={columnStyle(false, false)}
              minWidth="130px"
              maxWidth="130px"
            >
              <Text sx={labelStyle}>Decision du</Text>
              <Text sx={descriptionStyle}>{dateNominationFormated || ""}</Text>
            </Flex>
          )}
        </Flex>
        {/* </a> */}
      </Card>
    </>
  );
}
