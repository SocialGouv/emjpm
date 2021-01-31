import { getStyle } from "./style";
import SelectLabel from "./SelectLabel";

function SelectComponent({
  component: Component,
  componentRef,
  label,
  ...props
}) {
  const htmlFor = "react-select-" + props.id + "-input";
  return (
    <>
      {label && (
        <SelectLabel
          size={props.size}
          aria-label={props.name}
          htmlFor={htmlFor}
          isActive={props.isActive}
          required={props.required}
          readOnly={props.readOnly}
        >
          {label}
        </SelectLabel>
      )}
      <Component
        menuPortalTarget={document.body}
        styles={getStyle(props)}
        ref={componentRef}
        {...props}
      />
    </>
  );
}

SelectComponent.defaultProps = {
  loadingMessage: () => "Chargement des résultats en cours",
};

export default SelectComponent;
