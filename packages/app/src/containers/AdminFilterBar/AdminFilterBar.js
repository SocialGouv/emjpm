import { Flex } from "rebass";
import { Card } from "~/components";

import { AdminFilterBarStyle } from "./style";

function AdminFilterBar({ children }) {
  return (
    <Card
      mt="3"
      sx={AdminFilterBarStyle}
      mb={2}
      id="search_filter"
      tabIndex="-1"
    >
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        {children}
      </Flex>
    </Card>
  );
}

export { AdminFilterBar };
