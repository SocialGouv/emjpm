import { Card } from "@emjpm/ui";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import { WindowClose } from "@styled-icons/boxicons-regular/WindowClose";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { RemoveCircleOutline } from "@styled-icons/material/RemoveCircleOutline";
import { FileAdd } from "@styled-icons/remix-line/FileAdd";
import { FolderAdd } from "@styled-icons/remix-line/FolderAdd";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Link as StyledLink, Text } from "rebass";

import { MesureContext } from "../MesureContext";
import { MESURE_TYPE } from "./constants";
const linkStyle = { color: "black", fontSize: "1", my: "3" };

const MandataireMesureSidebar = props => {
  const { mesureId } = props;
  const { status } = useContext(MesureContext);
  return (
    <Box {...props}>
      <Card bg="cardSecondary" mb="1">
        <Link href="/mandataires">
          <StyledLink sx={linkStyle} display="block">
            <Flex>
              <ArrowBack size="16" />
              <Text pl="1">Retour à vos mesures</Text>
            </Flex>
          </StyledLink>
        </Link>
        {status === MESURE_TYPE.IN_PROGRESS && (
          <Fragment>
            <Link
              href="/mandataires/mesures/[mesure_id]/edit"
              as={`/mandataires/mesures/${mesureId}/edit`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <Edit size="16" />
                  <Text pl="1">Editer la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
            <Link
              href="/mandataires/mesures/[mesure_id]/close"
              as={`/mandataires/mesures/${mesureId}/close`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <WindowClose size="16" />
                  <Text pl="1">Cloturer la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
          </Fragment>
        )}
        {status === MESURE_TYPE.CLOSED && (
          <Fragment>
            <Link
              href="/mandataires/mesures/[mesure_id]/delete"
              as={`/mandataires/mesures/${mesureId}/delete`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <RemoveCircleOutline size="16" />
                  <Text pl="1"> Supprimer la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
            <Link
              href="/mandataires/mesures/[mesure_id]/reactivate"
              as={`/mandataires/mesures/${mesureId}/reactivate`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <FolderAdd size="16" />
                  <Text pl="1">Réouvrir la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
          </Fragment>
        )}
        {status === MESURE_TYPE.WAITING && (
          <Link
            href="/mandataires/mesures/[mesure_id]/accept"
            as={`/mandataires/mesures/${mesureId}/accept`}
          >
            <StyledLink sx={linkStyle} display="block">
              <Flex>
                <FileAdd size="16" />
                <Text pl="1">Accepter la mesure</Text>
              </Flex>
            </StyledLink>
          </Link>
        )}
      </Card>
    </Box>
  );
};

export { MandataireMesureSidebar };
