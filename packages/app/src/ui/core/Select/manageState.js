// https://raw.githubusercontent.com/JedWatson/react-select/7532d4d5f413456c232dc9b7ab8fa0df4f3c6785/packages/react-select/src/stateManager.js

import React, { useState, useRef } from "react";

const initialState = (props) => ({
  inputValue:
    props.inputValue !== undefined ? props.inputValue : props.defaultInputValue,
  menuIsOpen:
    props.menuIsOpen !== undefined ? props.menuIsOpen : props.defaultMenuIsOpen,
  value: props.value !== undefined ? props.value : props.defaultValue,
});

const manageState = (SelectComponent) => {
  function StateManager(props, selectRef) {
    const [state, setState] = useState(() => initialState(props));
    function focus() {
      selectRef.current?.focus();
    }
    function blur() {
      selectRef.current?.blur();
    }
    function getProp(key) {
      return props[key] !== undefined ? props[key] : state[key];
    }
    function callProp(name, ...args) {
      if (typeof props[name] === "function") {
        return props[name](...args);
      }
    }
    const onChange = (value, actionMeta) => {
      callProp("onChange", value, actionMeta);
      setState({ value });
    };
    const onInputChange = (value, actionMeta) => {
      // TODO: for backwards compatibility, we allow the prop to return a new
      // value, but now inputValue is a controllable prop we probably shouldn't
      const newValue = callProp("onInputChange", value, actionMeta);
      setState({
        inputValue: newValue !== undefined ? newValue : value,
      });
    };
    const onMenuOpen = () => {
      callProp("onMenuOpen");
      setState({ menuIsOpen: true });
    };
    const onMenuClose = () => {
      callProp("onMenuClose");
      setState({ menuIsOpen: false });
    };

    const {
      defaultInputValue = "",
      defaultMenuIsOpen = false,
      defaultValue = null,
      ...componentProps
    } = props;
    return (
      <SelectComponent
        {...componentProps}
        ref={selectRef}
        inputValue={getProp("inputValue")}
        menuIsOpen={getProp("menuIsOpen")}
        onChange={onChange}
        onInputChange={onInputChange}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        value={getProp("value")}
      />
    );
  }
  return React.forwardRef(StateManager);
};

export default manageState;
