import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "../../../src/components/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components/AdminFilterBar/context";
import { AdminTribunaux } from "../../../src/components/AdminTribunaux";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminTribunauxPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des tribunaux</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <AdminFilterBar onAddButtonClick={() => Router.push("/admin/tribunaux/add-tribunal")} />
            <AdminTribunaux />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminTribunauxPage);
