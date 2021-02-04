import { useMemo } from "react";
import { components as cs } from "react-select";

export function Option(props) {
  let { label } = props;
  if (props.data?.__isNew__) {
    label = `"` + label + `"`;
  }
  return <cs.Option {...props}>{label}</cs.Option>;
}

export function SingleValue() {
  return null;
}

export function Input({ value: inputValue, isHidden, ...props }) {
  const {
    selectProps: { value, getOptionLabel },
  } = props;
  const label = useMemo(() => {
    if (!value) {
      return "";
    }
    return getOptionLabel(value);
  }, [getOptionLabel, value]);
  const v = useMemo(() => {
    if (!inputValue) {
      return label;
    }
    return inputValue;
  }, [inputValue, label]);
  const hidden = useMemo(() => {
    if (v) {
      return false;
    }
    return isHidden;
  }, [isHidden, v]);
  return <cs.Input isHidden={hidden} value={v} {...props} />;
}

const CreatableComponents = {
  ...cs,
  Option,
  SingleValue,
  Input,
};

export default CreatableComponents;
