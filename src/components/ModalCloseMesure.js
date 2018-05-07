import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ModalMesure = {
  position: "absolute",
  width: "30% !important",
  height: "30% !important",
  top: "40%",
  left: "40%",
  right: "60px",
  bottom: "60px",
  backgroundColor: "#f2f2f2",
  overflow: "scroll",
  opacity: 2
};

const ModalCloseMesure = ({isOpen, onRequestClose, onClick, onClickSubmit, onClickClose}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="mandataire"
    background="#e9ecef"
    style={customStyles}
    className="ModalMesure"
    overlayClassName="OverlayInput"
  >
    <button onClick={onClick}>X</button>
    <div style={{ textAlign: "center" }}>
      <b>
        Eteindre la mesure? <br />
        Une fois cette opération effectuée,vous retrouverez cette mesure éteinte dans l'onglet
        corresponant, mais vous ne pourrez plus la modifier.
      </b>
      <br />
      <button type="submit" onClick={onClickSubmit} className="btn btn-success">
        Eteindre la Mesure
      </button>{" "}
      <button onClick={onClickClose} className="btn btn-success">
        Annuler
      </button>
    </div>
  </Modal>
);

export default ModalCloseMesure;
