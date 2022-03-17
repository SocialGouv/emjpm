import { useHistory } from "react-router-dom";
import { Flex, Box } from "rebass";
import { Helmet } from "react-helmet";

import { Button, SkipToContent, Tabs as TabsComponent } from "~/components";
import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";

import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import DepartementFilter from "~/containers/FilterWidgets/DepartementFilter";

import { AdminTribunaux } from "~/containers/AdminTribunaux";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

const { Tabs, TabList, Tab, TabPanel } = TabsComponent;

function AdminTribunauxPage() {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Liste des tribunaux | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="search_filter" />
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
                    onClick={() =>
                      history.push("/admin/tribunaux/add-tribunal")
                    }
                    title="Ajouter"
                    aria-label="Ajouter"
                  >
                    Ajouter
                  </Button>
                </Box>
              </AdminFilterBar>
              <Tabs style={{ width: "100%" }}>
                <TabList>
                  <Tab key="all">Tous</Tab>
                  <Tab key="actual">Actuels</Tab>
                  <Tab key="old">Anciens</Tab>
                </TabList>

                <TabPanel key="all">
                  <AdminTribunaux immutable={null} />
                </TabPanel>
                <TabPanel key="actual">
                  <AdminTribunaux immutable={true} />
                </TabPanel>
                <TabPanel key="old">
                  <AdminTribunaux immutable={false} />
                </TabPanel>
              </Tabs>
            </Flex>
          </BoxWrapper>
        </LayoutAdmin>
      </AdminFilterProvider>
    </>
  );
}

export default AdminTribunauxPage;
