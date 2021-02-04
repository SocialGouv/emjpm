import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { AdminEtablissements } from "~/containers/AdminEtablissements";
import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { AdminFilterProvider } from "~/containers/AdminFilterBar/context";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminEtablissementsPage() {
  const history = useHistory();
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={4} px={1}>
          <HeadingTitle>Liste des établissements</HeadingTitle>
          <Box mt={4} mb={4}>
            <AdminFilterBar
              useDepartementfilter
              onAddButtonClick={() => history.push("/admin/etablissements/add")}
            />
            <AdminEtablissements />
          </Box>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminEtablissementsPage;
