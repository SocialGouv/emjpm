import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { AdminTribunaux } from "~/components/AdminTribunaux";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AdminTribunauxPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des tribunaux</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar
              onAddButtonClick={() =>
                Router.push("/admin/tribunaux/add-tribunal")
              }
              useDepartementfilter={true}
            />
            <AdminTribunaux />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminTribunauxPage);
