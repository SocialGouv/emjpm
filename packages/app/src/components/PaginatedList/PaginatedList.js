import { Button } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useState } from "react";
import { Box, Flex } from "rebass";

import { PaginatedListStyle } from "./style";

const DataList = ({ entries, RowItem }) => (
  <Flex flexDirection="column">
    {entries.map((entry, index) => (
      <RowItem key={index} item={entry} />
    ))}
  </Flex>
);

const PaginatedList = ({
  entries,
  onLoadMore,
  RowItem,
  resultPerPage = 20,
  isMoreEntry = true
}) => {
  const [currentOffset, setCurrentOffset] = useState(resultPerPage);

  return (
    <Box sx={PaginatedListStyle}>
      {entries.length > 0 ? (
        <Fragment>
          <DataList entries={entries} RowItem={RowItem} />
          {isMoreEntry && (
            <Flex mt="5" alignItem="center">
              <Button
                onClick={() => {
                  onLoadMore(currentOffset);
                  setCurrentOffset(currentOffset + resultPerPage);
                }}
              >
                Afficher les éléments suivants
              </Button>
            </Flex>
          )}
        </Fragment>
      ) : (
        <div>Pas de donnée à afficher</div>
      )}
    </Box>
  );
};

export { PaginatedList };
