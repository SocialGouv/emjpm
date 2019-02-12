import Modal from "react-modal";

import ExitButton from "./ExitButton";

const ModalLayout = ({ handleHide, show, children, className = "ModalMesureUpdate" }) => (
  <Modal
    isOpen={show}
    onRequestClose={handleHide}
    background="#e9ecef"
    className={className}
    overlayClassName="OverlayInput"
  >
    <ExitButton onClick={handleHide}>X</ExitButton>
    {children}
  </Modal>
);

export default ModalLayout;
