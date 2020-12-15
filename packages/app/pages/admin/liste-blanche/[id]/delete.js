import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminLbUserDelete } from "../../../../src/components/AdminLbUserDelete";
import { LayoutAdmin } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";

const AdminUserDeletePage = (props) => {
  const { lbUserId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminLbUserDelete lbUserId={lbUserId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

AdminUserDeletePage.getInitialProps = async ({ query }) => {
  return { lbUserId: query.id };
};

export default withAuthSync(AdminUserDeletePage);
