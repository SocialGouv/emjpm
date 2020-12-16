import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminUserDelete } from "~/components/AdminUserDelete";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AdminUserDeletePage = (props) => {
  const { userId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <AdminUserDelete userId={userId} />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

AdminUserDeletePage.getInitialProps = async ({ query }) => {
  return { userId: query.user_id };
};

export default withAuthSync(AdminUserDeletePage);
