import { useRouter } from "next/router";
import React from "react";
import { Box } from "rebass";

import { AdminEtablissements } from "~/components/AdminEtablissements";
import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const AdminEtablissementsPage = () => {
  const router = useRouter();
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={4} px={1}>
          <HeadingTitle>Liste des établissements</HeadingTitle>
          <Box mt={4} mb={4}>
            <AdminFilterBar
              useDepartementfilter
              onAddButtonClick={() => router.push("/admin/etablissements/add")}
            />
            <AdminEtablissements />
          </Box>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminEtablissementsPage);
