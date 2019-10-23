import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";
import { AdminFilterBar } from "../../../src/components-v2/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components-v2/AdminFilterBar/context";
import { AdminTribunaux } from "../../../src/components-v2/AdminTribunaux";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";
import Router from "next/router";

const AdminTribunauxPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des tribunaux</Heading1>
          <Flex
            sx={{
              mt: "2",
              flexWrap: "wrap"
            }}
          >
            <AdminFilterBar
              onAddButtonClick={() => Router.push("/admin-v2/tribunaux/add-tribunal")}
            />
            <AdminTribunaux />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminTribunauxPage);
