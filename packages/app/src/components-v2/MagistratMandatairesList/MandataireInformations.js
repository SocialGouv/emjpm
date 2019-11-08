import React, { useState } from "react";
import { Heading3, Heading5, Card, Heading4, Spinner, Button } from "@socialgouv/emjpm-ui-core";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";
import { useQuery } from "@apollo/react-hooks";

import { MagistratMandataireAddComment } from "./MagistratMandataireAddComment";
import { topTextStyle, iconTextStyle, boxStyle, flexStyle } from "./style";
import { MANDATAIRE_COMMENTS } from "./queries";

const MandataireInformations = props => {
  const {
    antenneId,
    mandataireId,
    nom,
    prenom,
    telephone,
    email,
    ville,
    tis,
    adresse,
    codePostal,
    ti
  } = props;

  const [isOpen, toggleCommentForm] = useState(false);

  const { data, error, loading } = useQuery(MANDATAIRE_COMMENTS, {
    variables: {
      antenne_id: antenneId,
      mandataire_id: mandataireId
    }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }
  const { commentaires } = data;
  return (
    <div>
      <Heading3>{`${nom} ${prenom}`}</Heading3>
      <Flex sx={flexStyle}>
        <Box sx={boxStyle}>
          <Heading5>Contact</Heading5>
          <Flex mt="2">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>{email}</Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>{telephone}</Text>
          </Flex>
          <Heading5 mt="5">Adresse d’activité</Heading5>
          <Text sx={topTextStyle}>
            {adresse} {codePostal} {ville}
          </Text>
        </Box>
        <Box sx={boxStyle}>
          <Heading5 mt="5">Tribunaux d’instance</Heading5>
          {tis.map(ti => {
            return (
              <Text key={ti.tis.id} sx={topTextStyle}>
                - {ti.tis.etablissement}
              </Text>
            );
          })}
        </Box>
        {commentaires.length > 0 && (
          <Box>
            <Heading5 mt="3">Commentaire sur le mandataire</Heading5>
            {commentaires.map(commentaire => {
              return (
                <Text sx={topTextStyle} key={commentaire.id}>
                  - {commentaire.comment}
                </Text>
              );
            })}
          </Box>
        )}
        {isOpen ? (
          <MagistratMandataireAddComment
            ti={ti}
            antenneId={antenneId}
            mandataireId={mandataireId}
          />
        ) : (
          <Box mt="3">
            <Button
              variant="outline"
              onClick={() => {
                toggleCommentForm(true);
              }}
            >
              Ajouter un commentaire
            </Button>
          </Box>
        )}
      </Flex>
    </div>
  );
};

export { MandataireInformations };
