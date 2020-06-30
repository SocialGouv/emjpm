import { BoxWrapper } from "@emjpm/ui";
import { useRouter } from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ListeBlanche } from "../../../src/components/ListeBlanche";
import { ListeBlancheFilter } from "../../../src/components/ListeBlancheFilter";
import { FiltersContextProvider } from "../../../src/components/ListeBlancheFilter/context";
import { ListeBlancheSummary } from "../../../src/components/ListeBlancheSummary";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  const router = useRouter();
  return (
    <FiltersContextProvider>
      <LayoutAdmin>
        <BoxWrapper mt={4} px={1}>
          <Flex flexDirection="column">
            <Box mb="2">
              <ListeBlancheFilter />
            </Box>
            <Box mb="2">
              <ListeBlancheSummary />
            </Box>
            <Box mb="2">
              <ListeBlanche
                onSelectLbUser={async (item) => {
                  await router.push("/admin/liste-blanche/[lb_user_id]", {
                    pathname: `/admin/liste-blanche/${item.id}`,
                  });
                  window.scrollTo(0, 0);
                }}
              />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </FiltersContextProvider>
  );
};

export default withAuthSync(ListBlanchePage);
