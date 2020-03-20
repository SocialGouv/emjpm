import { Select } from "@rebass/forms";
import React from "react";
import { Button, Flex, Text } from "rebass";

const PaginationFooter = props => {
  const {
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize
  } = props;

  return (
    <Flex justifyContent="flex-end" alignItems="center">
      {canPreviousPage && (
        <Button variant="outline" onClick={() => previousPage()}>
          {"<"}
        </Button>
      )}
      <Text mx={20} fontWeight="bold">
        {pageIndex + 1} / {pageOptions.length}
      </Text>
      {canNextPage && (
        <Button variant="outline" onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </Button>
      )}
      <Select
        ml={20}
        width="200px"
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Afficher {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default PaginationFooter;
