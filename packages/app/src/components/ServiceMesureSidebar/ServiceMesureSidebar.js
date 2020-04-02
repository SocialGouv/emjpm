import { Card } from "@emjpm/ui";
import { ArrowBack, WindowClose } from "@styled-icons/boxicons-regular";
import { Edit } from "@styled-icons/boxicons-solid";
import { RemoveCircleOutline } from "@styled-icons/material";
import { FileAdd, FolderAdd } from "@styled-icons/remix-line";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Link as StyledLink, Text } from "rebass";

import { MesureContext } from "../MesureContext";
import { MESURE_TYPE } from "./constants";
const linkStyle = { color: "black", fontSize: "1", my: "3" };

const ServiceMesureSidebar = props => {
  const { mesureId } = props;
  const { status } = useContext(MesureContext);
  return (
    <Box {...props}>
      <Card bg="cardSecondary" mb="1">
        <Link href="/services">
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
              href={`/services/mesures/[mesure_id]/edit`}
              as={`/services/mesures/${mesureId}/edit`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <Edit size="16" />
                  <Text pl="1">Editer la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
            <Link
              href={`/services/mesures/[mesure_id]/close`}
              as={`/services/mesures/${mesureId}/close`}
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
              href={`/services/mesures/[mesure_id]/delete`}
              as={`/services/mesures/${mesureId}/delete`}
            >
              <StyledLink sx={linkStyle} display="block">
                <Flex>
                  <RemoveCircleOutline size="16" />
                  <Text pl="1"> Supprimer la mesure</Text>
                </Flex>
              </StyledLink>
            </Link>
            <Link
              href={`/services/mesures/[mesure_id]/reactivate`}
              as={`/services/mesures/${mesureId}/reactivate`}
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
            href={`/services/mesures/[mesure_id]/accept`}
            as={`/services/mesures/${mesureId}/accept`}
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

export { ServiceMesureSidebar };
