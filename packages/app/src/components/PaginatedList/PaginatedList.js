import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
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
  RowItem,
  resultPerPage,
  currentOffset,
  setCurrentOffset,
  count,
}) => {
  const totalPage = count / resultPerPage;
  return (
    <Box sx={PaginatedListStyle}>
      {entries.length > 0 ? (
        <Fragment>
          <DataList entries={entries} RowItem={RowItem} />
          {count > resultPerPage && (
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPage}
              containerClassName={"react-paginate"}
              marginPagesDisplayed={2}
              forcePage={currentOffset / resultPerPage}
              pageRangeDisplayed={5}
              onPageChange={(data) => {
                setCurrentOffset(data.selected * resultPerPage);
              }}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </Fragment>
      ) : (
        <div>Pas de donnée à afficher</div>
      )}
    </Box>
  );
};

export { PaginatedList };
