import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { format, parse } from "date-fns";

registerLocale("fr", fr);
setDefaultLocale("fr");

export default function InputDate(props) {
  let {
    dateFormatValue,
    onChange,
    value,
    selected,
    className,
    ...datePickerProps
  } = props;

  if (value) {
    selected = parse(value, dateFormatValue, new Date());
  }

  const onChangeProp = onChange;
  onChange = (date) => {
    let value;
    if (date) {
      value = format(date, dateFormatValue);
    }
    return onChangeProp(value);
  };

  return (
    <DatePicker
      onChange={onChange}
      selected={selected}
      className={classNames("datepicker", className)}
      {...datePickerProps}
    />
  );
}

InputDate.defaultProps = {
  dateFormatValue: "yyyy-MM-dd",
  dateFormat: "dd/MM/yyyy",
  showYearDropdown: true,
  isClearable: true,
};
