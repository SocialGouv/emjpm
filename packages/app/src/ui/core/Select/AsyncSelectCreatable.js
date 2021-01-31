import React, { useRef, useState, useEffect, useCallback } from "react";

import Select from "react-select";

import SelectComponent from "./SelectComponent";

import Components from "./CreatableComponents";

export default function AsyncSelectCreatable({
  onChange,
  onInputChange,
  hasError = false,
  size = "large",
  backspaceRemovesValue = false,
  components = {},
  noOptionsMessage = ({ inputValue }) => {
    if (inputValue.length < 1) {
      return "Entrez du texte pour rechercher ou créer une nouvelle entrée";
    }
    return "Aucune entrée trouvée";
  },
  loadOptions: loadOptionsProp,
  ...props
}) {
  const isMounted = useRef();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const inputValueRef = useRef();

  const [state, setState] = useState(() => ({
    isLoading: false,
    loadedOptions: [],
  }));

  // const loadOptions = useCallback(
  //   async (inputValue) => {
  //     if (inputValueRef.current === inputValue) {
  //       return;
  //     }
  //     inputValueRef.current = inputValue;
  //     console.log("load");
  //     setState({ isLoading: true, loadedOptions: [] });
  //     let loadedOptions;
  //     try {
  //       loadedOptions = await loadOptionsProp(inputValue);
  //     } catch (e) {
  //       console.log("catch");
  //       loadedOptions = [];
  //     }
  //     if (isMounted.current) {
  //       console.log("loaded", loadedOptions);
  //       setState({ isLoading: false, loadedOptions });
  //     }
  //   },
  //   [inputValueRef, loadOptionsProp, isMounted, setState]
  // );
  const loadOptions = async (inputValue) => {
    if (inputValueRef.current === inputValue) {
      return;
    }
    inputValueRef.current = inputValue;
    setState({ isLoading: true, loadedOptions: [] });
    let loadedOptions;
    try {
      loadedOptions = await loadOptionsProp(inputValue);
    } catch (e) {
      loadedOptions = [];
    }
    if (isMounted.current) {
      setState({ isLoading: false, loadedOptions });
    }
  };

  const allOptions = [...props.options, ...state.loadedOptions];

  return (
    <SelectComponent
      onChange={(value, event) => {
        // console.log("onChange", value);
        return onChange && onChange(value, event);
      }}
      onInputChange={(value, event) => {
        onInputChange && onInputChange(value, event);
        const { action } = event;
        if (action === "input-change") {
          // console.log("input-change", value);
          loadOptions(value);
          onChange && onChange(value);
        }
      }}
      components={{ ...Components, ...components }}
      component={Select}
      noOptionsMessage={() => "Aucune option"}
      hasError={hasError}
      size={size}
      backspaceRemovesValue={backspaceRemovesValue}
      isLoading={state.isLoading}
      {...props}
      options={allOptions}
    />
  );
}
