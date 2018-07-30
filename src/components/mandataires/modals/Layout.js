import Modal from "react-modal";

import ExitButton from "../../ExitButton";

const ModalLayout = ({ handleHide, show, children }) => (
  <Modal
    isOpen={show}
    onRequestClose={handleHide}
    background="#e9ecef"
    className="ModalMesureUpdate"
    overlayClassName="OverlayInput"
  >
    <ExitButton onClick={handleHide}>X</ExitButton>
    {children}
  </Modal>
);

export default ModalLayout;
