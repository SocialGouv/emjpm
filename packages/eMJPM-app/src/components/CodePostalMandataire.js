const locate = require("../../static/images/locate.svg");

const CodePostalMandataire = ({ findPostcode }) => {
  let input;
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      submit();
    }
  };
  const submit = () => findPostcode(input.value);
  return (
      <div>
        <input
          style={{
              border: "1px solid",
              borderColor: "black"
          }}
          ref={node => (input = node)}
          type="text"
          className="form-control"
          placeholder="Code Postal du MJPM"
          onKeyDown={onKeyDown}
        />
      </div>
  );
};

export default CodePostalMandataire;
