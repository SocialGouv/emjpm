import { Select } from "@rebass/forms";

import ReactPaginate from "react-paginate";
import { Flex } from "rebass";

const DynamicTableFooter = (props) => {
  const { gotoPage, pageIndex, pageSize, pageCount, setPageSize } = props;
  return (
    <Flex justifyContent="flex-end" alignItems="center">
      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        containerClassName={"react-paginate"}
        marginPagesDisplayed={2}
        forcePage={pageIndex}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => gotoPage(selected)}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />

      <Select
        instanceId={"dynamic-table-footer" + (props.instanceId || "")}
        ml={20}
        width="200px"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Afficher {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default DynamicTableFooter;
