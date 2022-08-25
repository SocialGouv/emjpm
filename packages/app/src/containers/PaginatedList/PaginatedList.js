import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { PaginatedListStyle } from "./style";

function DataList({
  entries,
  RowItem,
  renderActions,
  onRowClick,
  getHref,
  sdpfdepartements,
}) {
  return (
    <Flex flexDirection="column">
      {entries.map((entry, index) => (
        <RowItem
          onClick={(e) => onRowClick && onRowClick(entry, e)}
          getHref={getHref}
          key={index}
          item={entry}
          renderActions={renderActions}
          sdpfdepartements={sdpfdepartements}
        />
      ))}
    </Flex>
  );
}

function PaginatedList({
  entries,
  RowItem,
  resultPerPage,
  currentOffset,
  setCurrentOffset,
  count,
  renderActions,
  onRowClick,
  getHref,
  sdpfdepartements,
}) {
  const totalPage = count / resultPerPage;
  return (
    <Box sx={PaginatedListStyle}>
      {entries.length > 0 ? (
        <>
          <DataList
            entries={entries}
            RowItem={RowItem}
            renderActions={renderActions}
            onRowClick={onRowClick}
            getHref={getHref}
            sdpfdepartements={sdpfdepartements}
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
        </>
      ) : (
        <div>Pas de donnée à afficher</div>
      )}
    </Box>
  );
}

export { PaginatedList };
