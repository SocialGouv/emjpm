import { BoxWrapper, Button } from "@emjpm/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LayoutDirection } from "../../../src/components/Layout";
import { ListeBlanche } from "../../../src/components/ListeBlanche";
import { ListeBlancheFilter } from "../../../src/components/ListeBlancheFilter";
import { FiltersContextSerializableProvider } from "../../../src/components/ListeBlancheFilter/context";
import { ListeBlancheSummary } from "../../../src/components/ListeBlancheSummary";
import { UserContext } from "../../../src/components/UserContext";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  return (
    <LayoutDirection>
      <FiltersContextSerializableProvider useLocalStorage={true}>
        <BoxWrapper mt={4} px={1}>
          <Flex flex={1} mb={4} justifyContent="flex-end">
            <Box>
              <Button>
                <Link href={`/${user.type}/liste-blanche/ajout-individuel`}>
                  {"Ajouter un mandataire invididuel"}
                </Link>
              </Button>
            </Box>
            <Box>
              <Button ml={4}>
                <Link href={`/${user.type}/liste-blanche/ajout-prepose`}>
                  {"Ajouter un prepose à un établissement"}
                </Link>
              </Button>
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Box mb="2">
              <ListeBlancheFilter />
            </Box>
            <Box mb="2">
              <ListeBlancheSummary />
            </Box>
            <Box mb="2">
              <ListeBlanche
                onSelectItem={async (item) => {
                  await router.push(
                    "/direction/liste-blanche/[id]",
                    `/direction/liste-blanche/${item.id}`
                  );
                  window.scrollTo(0, 0);
                }}
              />
            </Box>
          </Flex>
        </BoxWrapper>
      </FiltersContextSerializableProvider>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
