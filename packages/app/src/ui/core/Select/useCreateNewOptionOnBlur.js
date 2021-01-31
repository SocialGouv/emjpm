import { useRef } from "react";

// no viable solution for createNewOptionOnBlur found at https://github.com/JedWatson/react-select/issues/1764
// editSelectedTag https://github.com/JedWatson/react-select/issues/1558#issuecomment-471657335

export default function useCreateNewOptionOnBlur(props) {
  return props;
}
// export default function useCreateNewOptionOnBlur(
//   {
//     onChange,
//     onBlur,
//     onFocus,
//     getNewOptionData,
//     createNewOptionOnBlur,
//     editSelectedTag,
//     setOptions,
//     options = [],
//     value,
//     ...props
//   },
//   componentRef
// ) {
//   const handleCreateNewOptionOnBlur = () => {
//     const value = componentRef.current?.select.state.inputValue;
//     if (!setOptions || !onChange) {
//       console.error(
//         "createNewOptionOnBlur require onChange and setOptions props defined in SelectCreatable"
//       );
//       return;
//     }
//     if (value) {
//       let newOption;
//       if (getNewOptionData) {
//         newOption = getNewOptionData(value);
//       } else {
//         newOption = { label: value, value, creating: true };
//       }
//       setOptions([...options.filter(({ creating }) => !creating), newOption]);
//       onChange(newOption);
//     } else {
//       setOptions([...options.filter(({ creating, value }) => !creating)]);
//       // onChange(null);
//     }
//   };
//
//   const handleBlur = (props) => {
//     if (createNewOptionOnBlur) {
//       handleCreateNewOptionOnBlur();
//     }
//     onBlur && onBlur(props);
//   };
//
//   const handleFocus = (element) => {
//     if (editSelectedTag) {
//       if (componentRef.current && props.value?.value) {
//         componentRef.current.select.state.inputValue = props.value.value;
//       }
//     }
//     onFocus && onFocus(element);
//   };
//
//   return {
//     onChange,
//     onBlur: handleBlur,
//     onFocus: handleFocus,
//     options,
//     value,
//     ...props,
//   };
// }
