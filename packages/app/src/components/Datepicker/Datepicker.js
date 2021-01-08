import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

import classNames from "classnames";
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";

import DP, { registerLocale } from "react-datepicker";

registerLocale("fr", fr);

export const Datepicker = (props) => {
  const { selected, onChange, placeholder, hasError } = props;
  return (
    <DP
      placeholderText={placeholder}
      className={classNames({
        dp_error: hasError,
        dp_input: true,
      })}
      dateFormat="dd/MM/yyyy"
      locale="fr"
      selected={selected}
      onChange={onChange}
    />
  );
};

Datepicker.defaultProps = {
  placeholder: undefined,
};

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Datepicker;
