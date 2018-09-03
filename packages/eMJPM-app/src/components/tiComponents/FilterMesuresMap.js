import styled from "styled-components";

//Redux
import { connect } from "react-redux";

import SearchButton from "../communComponents/SearchButton";
import FormInput from "../common/FormInput";
import { zoomCodePostal } from "./actions/map";

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 350px;
`;

function mapDispatchToProps(dispatch) {
  return {
    zoomCodePostal: codePostal => dispatch(zoomCodePostal(codePostal))
  };
}

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

export default connect(
  null,
  mapDispatchToProps
)(FilterMesuresMap);
