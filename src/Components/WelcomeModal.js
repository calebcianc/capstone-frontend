import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%", // Or whatever width you want
  backgroundColor: "var(--primary-color)",
  padding: "20px",
  borderRadius: "8px", // Optional for rounded corners
  outline: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default function WelcomeModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="welcome-modal-title"
      aria-describedby="welcome-modal-description"
    >
      <Fade in={open} timeout={{ exit: 1500 }}>
        <div style={modalStyle}>
          <img src="/logo512.png" className="App-logo" alt="logo" />
          <h1>Welcome to CHEFTALK</h1>
        </div>
      </Fade>
    </Modal>
  );
}
