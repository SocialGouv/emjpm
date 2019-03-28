import React from "react";
import styled from "styled-components";
import SearchButton from "../communComponents/SearchButton";
import FormInput from "../common/FormInput";

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 350px;
`;

const FilterMesuresMap = ({ zoomCodePostal }) => {
  const inputRef = React.createRef();

  const handleZoomCodePostalInput = () => {
    if (!inputRef.current) {
      return;
    }
    zoomCodePostal(inputRef.current.value);
  }

  const onKeyDown = e => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      handleZoomCodePostalInput();
    }
  };

  return (
    <Presentation>
      <div className="form-inline">
        <FormInput
          data-cy="tab-code-postal"
          ref={inputRef}
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
          onClick={handleZoomCodePostalInput}
        >
          Rechercher
        </SearchButton>
      </div>
    </Presentation>
  );
};

export default FilterMesuresMap;
