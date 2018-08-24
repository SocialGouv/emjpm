import styled from "styled-components";

import SearchButton from "../communComponents/SearchButton";
import FormInput from "../serviceComponents/FormInput";

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 350px;
`;

const FilterMesuresMap = ({ zoomCodePostal, updateValue, value }) => {
  let input;
  return (
    <Presentation>
      <div className="form-inline">
        <FormInput
          data-cy="tab-code-postal"
          innerRef={node => (input = node)}
          padd="10"
          size="200"
          id="commune"
          name="commune"
          onChange={e => updateValue(e.target.value)}
          placeholder={value || "Code Postal"}
        />
        <SearchButton
          data-cy="tab-recherche"
          align="center"
          type="submit"
          onClick={() => zoomCodePostal(input.value)}
        >
          Rechercher
        </SearchButton>
      </div>
    </Presentation>
  );
};

export default FilterMesuresMap;
