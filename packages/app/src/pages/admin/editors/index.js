import { useHistory } from "react-router-dom";
import { Flex, Box } from "rebass";
import { Helmet } from "react-helmet";

import { Button, SkipToContent } from "~/components";
import { AdminEditorRequest, AdminEditors } from "~/containers/AdminEditors";
import { AdminFilterBar } from "~/containers/AdminFilterBar";
import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminEditorsPage() {
  const history = useHistory();
  return (
    <>
      <SkipToContent skipTo="search_filter" />
      <Helmet>
        <title>Liste des éditeurs | e-MJPM </title>
      </Helmet>
      <AdminFilterProvider>
        <LayoutAdmin>
          <BoxWrapper mt={3} px="1">
            <HeadingTitle>Liste des éditeurs</HeadingTitle>
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
                  </Flex>
                </Box>
                <Box>
                  <Button
                    width="120px"
                    onClick={() => history.push("/admin/editors/create")}
                    title="Ajouter"
                    aria-label="Ajouter"
                  >
                    Ajouter
                  </Button>
                </Box>
              </AdminFilterBar>

              <AdminEditors />
              <AdminEditorRequest />
            </Flex>
          </BoxWrapper>
        </LayoutAdmin>
      </AdminFilterProvider>
    </>
  );
}

export default AdminEditorsPage;
