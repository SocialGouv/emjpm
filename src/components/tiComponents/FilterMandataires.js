//@flow
import styled from "styled-components";
import React from "react";

//Redux
import { connect } from "react-redux";

import { filtersMesure, updateFiltersMandataire, updateFilters } from "./actions/mandataire";

const RadioStyle = styled.label`
  cursor: pointer;
  width: 40px;
  padding: 5px;
  margin-right: 40px;
`;

type FiltersMandataireTableMapType = {
  updateFilters: SyntheticMouseEvent<HTMLButtonElement>,
  display: string
};
const Radio = ({ children }) => <RadioStyle> {children} </RadioStyle>;

function mapDispatchToProps(dispatch) {
  return {
    filtersMesure: (filters, data, isMandataire) =>
      dispatch(filtersMesure(filters, data, isMandataire)),
    updateFiltersMandataire: (filters, data) => dispatch(updateFiltersMandataire(filters, data)),
    updateFilters: (filters, data) => dispatch(updateFilters(filters, data))
  };
}
const mapStateToProps = state => ({
  data: state.mandataire.data,
  datamesure: state.mandataire.datamesure
});

const FiltersMandataireTableMap = ({
  filtersMesure,
  input,
  isMandataire,
  data,
  datamesure,
  updateFiltersMandataire,
  updateFilters
}: FiltersMandataireTableMapType) => {
  return (
    <div
      className="custom-control custom-radio custom-control-inline"
      style={{ marginLeft: "5px" }}
    >
      <Radio htmlFor="customRadioInline4">
        <input
          type="radio"
          id="customRadioInline4"
          name="customRadioInline"
          defaultChecked={true}
          value="Tous"
          onClick={e =>
            isMandataire ? updateFiltersMandataire("", data) : updateFilters("", datamesure)
          }
        />Tous
      </Radio>

      {input &&
        input.map &&
        input.map(value => (
          <Radio htmlFor={`customRadioInline1_${value}`}>
            <input
              data-cy="tab-individuel"
              type="radio"
              id={`customRadioInline1_${value}`}
              name="customRadioInline"
              value={value}
              onClick={e =>
                isMandataire
                  ? filtersMesure(e.target.value, data, isMandataire)
                  : filtersMesure(e.target.value, datamesure, isMandataire)
              }
            />Individuels
          </Radio>
        ))}
    </div>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersMandataireTableMap);
