import styled from "styled-components";
import SearchButton from "../communComponents/SearchButton";
import FormInput from "../FormInput";

const FilterMesuresMap = ({ getPostCodeCoordinates, updateValue, value }) => {
  let input;
  return (
    <Presentation>
      <tr className="form-inline">
        <td>
          <FormInput
            innerRef={node => (input = node)}
            padd="10"
            size="200"
            id="commune"
            name="commune"
            onChange={e => updateValue(e.target.value)}
            placeholder={value || "Commune ou Code Postal"}
          />
        </td>
        <td>
          <SearchButton
            align="center"
            type="submit"
            onClick={() => getPostCodeCoordinates(input.value)}
          >
            Rechercher
          </SearchButton>
        </td>
      </tr>
    </Presentation>
  );
};

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 100%;
`;

export default FilterMesuresMap;
