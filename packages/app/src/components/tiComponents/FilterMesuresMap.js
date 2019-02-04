import React from "react";
import styled from "styled-components";
import SearchButton from "../communComponents/SearchButton";
import { FormInput } from "../common/FormInput";

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 350px;
`;

const FilterMesuresMap = ({ zoomCodePostal }) => {
  let input;
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      zoomCodePostal(input.value);
    }
  };
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
          onKeyDown={onKeyDown}
          placeholder={"Code Postal"}
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
