//@flow
import styled from "styled-components";
import React from "react";

//Redux
import { connect } from "react-redux";

import { updateFiltersMandataire, updateFilters } from "./actions/mandataire";

const RadioStyle = styled.label`
  cursor: pointer;
  flex: 1 0 auto;
  padding: 5px;
`;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: value =>
    // todo : make a single method
    ownProps.isMandataire
      ? dispatch(updateFiltersMandataire(value))
      : dispatch(updateFilters(value))
});

const mapStateToProps = (state, ownProps) => ({
  currentFilter: state.mandataire.filters || ""
});

// dumber
const Choice = ({ label, value, onClick, ...props }) => (
  <RadioStyle htmlFor={`customRadioInline1_${value}`}>
    <input
      data-cy={`tab-${value}`}
      type="radio"
      style={{ marginRight: 5 }}
      id={`customRadioInline1_${value}`}
      name="customRadioInline"
      value={value}
      onClick={onClick}
      {...props}
    />
    {label}
  </RadioStyle>
);

// value: Label
const choices = {
  "": "Tous",
  Individuel: "Individuels",
  Prepose: "Préposés",
  Service: "Services"
};

// dumb
const FilterMandataires = ({ onClick, currentFilter }) => (
  <div
    className="custom-control custom-radio custom-control-inline"
    style={{ marginLeft: "5px", flex: "1", maxWidth: 500, alignItems: "center" }}
  >
    {choices &&
      Object.keys &&
      Object.keys(choices) &&
      Object.keys(choices).map((choice, idx) => (
        <Choice
          key={choice}
          label={choices[choice]}
          defaultChecked={choice === currentFilter}
          value={choice}
          onClick={e => onClick(choice)}
        />
      ))}
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterMandataires);
