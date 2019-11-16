import { Button, Card, Input, Text } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { AdminFilterContext } from "./context";
import { AdminFilterBarStyle, FilterTextStyle } from "./style";

const AdminFilterBar = ({ onAddButtonClick }) => {
  const { searchText, changeSearchText } = useContext(AdminFilterContext);
  return (
    <Card mt="3" sx={AdminFilterBarStyle} mb={2}>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={FilterTextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="170px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={event => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Filtre"
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Button width="120px" onClick={onAddButtonClick}>
            Ajouter
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

export { AdminFilterBar };
