import { useHistory } from "react-router-dom";
import { Flex, Box } from "rebass";
import { Button } from "~/components";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";

import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import DepartementFilter from "~/containers/FilterWidgets/DepartementFilter";

import { AdminTribunaux } from "~/containers/AdminTribunaux";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminTribunauxPage() {
  const history = useHistory();
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Liste des tribunaux</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar>
              <Box>
                <Flex>
                  <SearchFilter />
                  <DepartementFilter />
                </Flex>
              </Box>
              <Box>
                <Button
                  width="120px"
                  onClick={() => history.push("/admin/tribunaux/add-tribunal")}
                >
                  Ajouter
                </Button>
              </Box>
            </AdminFilterBar>
            <AdminTribunaux />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminTribunauxPage;
