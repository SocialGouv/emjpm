import { useRef } from "react";
import Creatable from "react-select/creatable";

import SelectComponent from "./SelectComponent";
import useCreateNewOptionOnBlur from "./useCreateNewOptionOnBlur";
export function SelectCreatable(props) {
  const componentRef = useRef();
  props = useCreateNewOptionOnBlur(props, componentRef);
  return (
    <SelectComponent
      component={Creatable}
      componentRef={componentRef}
      {...props}
    />
  );
}

SelectCreatable.defaultProps = {
  hasError: false,
  size: "large",
  noOptionsMessage: () => "Aucune option",
  allowCreateWhileLoading: true,
};
