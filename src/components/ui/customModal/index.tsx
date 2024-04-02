import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "#00000080",
  },
};

export function CustomModal({ isOpen, setIsOpen, children }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={setIsOpen} style={customStyles}>
      {children}
    </Modal>
  );
}
