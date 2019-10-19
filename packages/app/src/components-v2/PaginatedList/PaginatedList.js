import { Button } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useState } from "react";
import { Box, Flex } from "rebass";
import { PaginatedListStyle } from "./style";

const DataList = ({ entries, RowComponent }) => (
  <Flex flexDirection="column">
    {entries.map((entry, index) => (
      <RowComponent key={index} {...entry} />
    ))}
  </Flex>
);

const PaginatedList = ({
  entries,
  onLoadMore,
  RowComponent,
  resultPerPage = 20,
  isMoreEntries = true
}) => {
  const [currentOffset, setCurrentOffset] = useState(resultPerPage);

  return (
    <Box sx={PaginatedListStyle}>
      {entries.length > 0 ? (
        <Fragment>
          <DataList entries={entries} RowComponent={RowComponent} />
          {isMoreEntries && (
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
