//@flow
import styled from "styled-components";
import React from "react";

//Redux
import { connect } from "react-redux";

import { updateFiltersMandataire, updateFilters } from "./actions/mandataire";

const RadioStyle = styled.label`
  cursor: pointer;
  width: 40px;
  padding: 5px;
  margin-right: 40px;
`;

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: value =>
    // todo : make a single method
    ownProps.isMandataire
      ? dispatch(updateFiltersMandataire(value))
      : dispatch(updateFilters(value))
});

// dumber
const Choice = ({ label, value, onClick, ...props }) => (
  <RadioStyle htmlFor={`customRadioInline1_${value}`}>
    <input
      data-cy={`tab-${value}`}
      type="radio"
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
const FilterMandataires = ({ onClick }) => (
  <div
    className="custom-control custom-radio custom-control-inline"
    style={{ marginLeft: "5px", flex: "1" }}
  >
    {choices &&
      Object.keys &&
      Object.keys(choices) &&
      Object.keys(choices).map((choice, idx) => (
        <Choice
          key={choice}
          label={choices[choice]}
          value={choice}
          onClick={e => onClick(choice)}
          defaultChecked={idx === 0}
        />
      ))}
  </div>
);

export default connect(
  null,
  mapDispatchToProps
)(FilterMandataires);
