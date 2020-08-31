import { BoxWrapper, Heading1 } from "@emjpm/ui";
import { useRouter } from "next/router";
import React from "react";
import { Flex } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ServiceCreate } from "../../../src/components/Service";
import { withAuthSync } from "../../../src/util/auth";

const AddServicePage = () => {
  const router = useRouter();
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un service`}</Heading1>
        <Flex flexWrap="wrap" mt="2">
          <ServiceCreate
            onSuccess={async () => {
              await router.push(`/admin/liste-blanche`);
            }}
          />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddServicePage);
