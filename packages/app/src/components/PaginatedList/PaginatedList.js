import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { PaginatedListStyle } from "./style";

const DataList = ({ entries, RowItem, renderActions, onRowClick }) => (
  <Flex flexDirection="column">
    {entries.map((entry, index) => (
      <RowItem
        onClick={() => (onRowClick ? onRowClick(entry) : null)}
        key={index}
        item={entry}
        renderActions={renderActions}
      />
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
  renderActions,
  onRowClick,
}) => {
  const totalPage = count / resultPerPage;
  return (
    <Box sx={PaginatedListStyle}>
      {entries.length > 0 ? (
        <Fragment>
          <DataList
            entries={entries}
            RowItem={RowItem}
            renderActions={renderActions}
            onRowClick={onRowClick}
          />
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
