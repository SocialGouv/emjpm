import React from "react";
import { Flex } from "rebass";

import { AdminLbUserDelete } from "~/components/AdminLbUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

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
