import { Lock } from "@styled-icons/boxicons-solid/Lock";
import { useState } from "react";
import { Box, Flex } from "rebass";

import { Button, Card, Text } from "~/components";

import { AdminEditTribunal } from "./AdminEditTribunal";
import { AdminTribunalMagistrats } from "./AdminTribunalMagistrats";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

function RowItem({ item }) {
  const {
    id,
    etablissement,
    code_postal,
    ville,
    siret,
    immutable,
    magistrats_aggregate: {
      aggregate: { count },
    },
    magistrats,
  } = item;
  const [editMode, setEditMode] = useState(false);

  const toogleEditMode = () => setEditMode(!editMode);

  return (
    <>
      <Card sx={cardStyle} width="100%">
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Flex>
                  {immutable && <Lock size="16" />}
                  <Text sx={descriptionStyle}>{etablissement}</Text>
                </Flex>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
              <Flex width="200px" flexDirection="column">
                <Text sx={labelStyle}>SIRET</Text>
                <Text sx={descriptionStyle}>{siret}</Text>
              </Flex>
              <Flex width="100px" flexDirection="column">
                <Text sx={labelStyle}>Magistrats</Text>
                <Text sx={descriptionStyle}>{count}</Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px" textAlign="center">
            <Button width="120px" onClick={toogleEditMode} variant="outline">
              Voir
            </Button>
          </Box>
        </Flex>
      </Card>
      {editMode && (
        <Card>
          <AdminTribunalMagistrats magistrats={magistrats} />
          {!immutable && (
            <AdminEditTribunal tribunal={item} closePanel={toogleEditMode} />
          )}
        </Card>
      )}
    </>
  );
}

export default RowItem;
