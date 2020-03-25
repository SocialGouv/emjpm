import React, { useEffect } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { Box, Flex, Text } from "rebass";

import DynamicTableFooter from "./DynamicTableFooter";
import { TableRowStyle } from "./style";

const DynamicTable = props => {
  const { columns, data, selectedRows, setSelectedRows } = props;

  const table = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20, selectedRowPaths: selectedRows }
    },
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { selectedRowIds, pageIndex, pageSize }
  } = table;

  useEffect(() => setSelectedRows(selectedFlatRows.map(d => d.original)), [
    setSelectedRows,
    selectedRowIds,
    selectedFlatRows
  ]);

  return (
    <Box>
      <Box {...getTableProps()}>
        {headerGroups.map((headerGroup, rowIndex) => (
          <Flex
            key={`header-row-${rowIndex}`}
            py={10}
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column, columnIndex) => {
              return (
                <Flex
                  key={`header-${rowIndex}-column-${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={1 / headerGroup.headers.length}
                  sx={{ fontWeight: "bold" }}
                  p={10}
                >
                  <Box>{column.render("Header")}</Box>
                  <Text ml={10}>
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        ))}

        <Box {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);

            return (
              <Flex
                key={`row-${rowIndex}`}
                {...row.getRowProps()}
                sx={TableRowStyle}
                bg={rowIndex % 2 === 0 ? "cardSecondary" : "inherit"}
              >
                {row.cells.map((cell, columnIndex) => {
                  return (
                    <Flex
                      key={`${rowIndex}-column-${columnIndex}`}
                      alignItems="center"
                      justifyContent="center"
                      width={1 / row.cells.length}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Flex>
                  );
                })}
              </Flex>
            );
          })}
        </Box>
      </Box>

      <Box mt={3}>
        <DynamicTableFooter
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </Box>
    </Box>
  );
};

export default DynamicTable;
