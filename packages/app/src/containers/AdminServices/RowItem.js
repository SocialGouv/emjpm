import { useCallback } from "react";
import { Box, Flex } from "rebass";

import { Card, Text } from "~/components";
import { useHistory } from "react-router-dom";

import { cardStyle, descriptionStyle, labelStyle } from "./style";

export default function RowItem({ item }) {
  const { id, etablissement, code_postal, ville } = item;
  const history = useHistory();

  const onRowClick = useCallback(
    () => history.push(`/admin/services/${id}`),
    [id, history]
  );

  return (
    <>
      <Card sx={cardStyle} width="100%" onClick={onRowClick}>
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Text sx={descriptionStyle}>{etablissement}</Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </>
  );
}
