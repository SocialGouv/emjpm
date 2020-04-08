import { findOption } from "../../util/option/OptionUtil";

const getLabel = (value, options) => {
  if (value == undefined || value == null) {
    return "non renseigné";
  }
  if (options) {
    const option = findOption(options, value);
    return option.label;
  }
  return value;
};

export { getLabel };
