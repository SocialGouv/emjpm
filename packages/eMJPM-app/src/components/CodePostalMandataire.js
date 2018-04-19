const CodePostalMandataire = ({ findPostcode, className = "", style }) => {
  let input;
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      submit();
    }
  };
  const submit = () => {
    findPostcode(input.value);
  };
  return (
    <input
      style={style}
      ref={node => (input = node)}
      type="text"
      className={"form-control " + className}
      placeholder="Code Postal du MJPM"
      onKeyDown={onKeyDown}
    />
  );
};

export default CodePostalMandataire;
