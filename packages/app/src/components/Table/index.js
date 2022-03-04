import { Box, Text, Flex } from "rebass";

const Table = ({ columns, tableData }) => {
  return (
    <Flex flexWrap="wrap" as="table" flex={1}>
      {tableData.map((item, index) => {
        return (
          <Box
            width={1 / columns}
            as="tr"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              borderBottom:
                tableData.length > index + columns ? "none" : "1px solid black",
              borderRight:
                (index + 1) % columns === 0 ? "1px solid black" : "none",
            }}
          >
            <Text
              py={1}
              as={index < columns ? "th" : "td"}
              style={{
                fontWeight: index < columns ? "bold" : "normal",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Table;
