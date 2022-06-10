import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { AdminEtablissements } from "~/containers/AdminEtablissements";
import { AdminFilterBar } from "~/containers/AdminFilterBar";
import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import DepartementFilter from "~/containers/FilterWidgets/DepartementFilter";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { Cog } from "@styled-icons/fa-solid/Cog";

import { Button, SkipToContent } from "~/components";

function AdminEtablissementsPage() {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Liste des établissements | e-MJPM </title>
      </Helmet>
      <SkipToContent skipTo="search_filter" />
      <AdminFilterProvider>
        <LayoutAdmin>
          <BoxWrapper mt={3} px={1}>
            <HeadingTitle>Liste des établissements</HeadingTitle>
            <Box mt={4} mb={4}>
              <AdminFilterBar>
                <Box>
                  <Flex>
                    <SearchFilter />
                    <DepartementFilter />
                  </Flex>
                </Box>
                <Box>
                  <Button
                    role="link"
                    onClick={() => history.push("/admin/etablissements/config")}
                    style={{
                      backgroundColor: "white",
                      borderColor: "#0072ca",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderRadius: 5,
                      padding: "12px",
                    }}
                    title="Mise à jour de la base de données FINESS"
                    aria-label="Mise à jour de la base de données FINESS"
                  >
                    <Cog size={18} style={{ color: "#333", height: "100%" }} />
                  </Button>
                </Box>
              </AdminFilterBar>

              <AdminEtablissements />
            </Box>
          </BoxWrapper>
        </LayoutAdmin>
      </AdminFilterProvider>
    </>
  );
}

export default AdminEtablissementsPage;
