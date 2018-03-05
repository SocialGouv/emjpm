const CodePostalMandataire = ({ findPostcode }) => {
  let input;
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      submit();
    }
  };
  const submit = () => findPostcode(input.value);
  return (
    <div
      style={{
        width: 350,
        height: 80,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#ffedad",
        margin: "0 auto"
      }}
    >
      <img
        style={{ width: 60, float: "left" }}
        src="/static/images/locate.svg"
        alt="carte presentation"
      />
      <div style={{ fontSize: "1.3em", marginBottom: 5 }}>Au plus proche du majeur protégé</div>
      <div>
        <input
          style={{ width: 100, textAlign: "center", display: "inline", clear: "both" }}
          ref={node => (input = node)}
          type="text"
          className="form-control"
          placeholder="Code Postal"
          onKeyDown={onKeyDown}
        />
        <button style={{ width: 50 }} type="button" className="btn btn-secondary" onClick={submit}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default CodePostalMandataire;
