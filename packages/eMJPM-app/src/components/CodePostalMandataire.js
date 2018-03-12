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
        width: 400,
        height: 100,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#ffedad",
        margin: "0 auto"
      }}
    >
      <img
        style={{ width: 80, float: "left", verticalAlign: "middle" }}
        src="/static/images/locate.svg"
        alt="carte presentation"
      />
      <div style={{ fontSize: "1.1rem", marginBottom: 5 }}>Au plus proche du majeur protégé</div>
      <div>
        <input
          style={{
            fontSize: "1.3rem",
            width: 130,
            textAlign: "center",
            display: "inline",
            clear: "both",
            verticalAlign: "top"
          }}
          ref={node => (input = node)}
          type="text"
          className="form-control"
          placeholder="Code Postal"
          onKeyDown={onKeyDown}
        />
        <button
          style={{
            width: 50,
            fontSize: "1.3rem",
            verticalAlign: "top"
          }}
          type="button"
          className="btn btn-secondary"
          onClick={submit}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default CodePostalMandataire;
