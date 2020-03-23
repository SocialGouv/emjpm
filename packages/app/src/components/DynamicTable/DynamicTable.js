import React, { useEffect } from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { Box, Flex, Text } from "rebass";

import DynamicTableFooter from "./DynamicTableFooter";

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
            mb={10}
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column, columnIndex) => {
              return (
                <Flex
                  justifyContent="center"
                  key={`header-${rowIndex}-column-${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={1 / headerGroup.headers.length}
                  sx={{ fontWeight: "bold" }}
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
                py={10}
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                flexWrap="wrap"
                key={`row-${rowIndex}`}
                {...row.getRowProps()}
                bg={rowIndex % 2 === 0 ? "cardSecondary" : "inherit"}
              >
                {row.cells.map((cell, columnIndex) => {
                  return (
                    <Flex
                      sx={{
                        textAlign: "center"
                      }}
                      alignItems="center"
                      justifyContent="center"
                      width={1 / row.cells.length}
                      key={`${rowIndex}-column-${columnIndex}`}
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
