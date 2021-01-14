import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { AdminEtablissements } from "~/components/AdminEtablissements";
import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

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
