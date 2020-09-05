import { Card } from "@emjpm/ui";
// import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { PaginatedList } from "../PaginatedList";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const resultPerPage = 50;

const RowItem = (props) => {
  const { item } = props;
  const { id, etablissement, code_postal, ville } = item;
  return (
    <Fragment>
      <Card sx={cardStyle} width="100%">
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Text sx={descriptionStyle}>{etablissement}</Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
            </Flex>
          </Box>
          {/* <Box mr="1" width="120px">
            <Link href={`/admin/services/[service_id]`} as={`/admin/services/${id}`}>
              <a>
                <Button>Voir</Button>
              </a>
            </Link>
          </Box> */}
        </Flex>
      </Card>
    </Fragment>
  );
};

export const AdminEtablissements = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  return (
    <PaginatedList
      entries={[]}
      RowItem={RowItem}
      count={0}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export default AdminEtablissements;
