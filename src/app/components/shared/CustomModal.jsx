import { Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

export default function CustomModal({ openModal, handleClose, children }) {
  return (
    <div
      className=""
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        background: "#000000ab",
        width: "100%",
        height: "100%",
        zIndex: "1200",
        display: "flex",
        padding: "80px 0px",
        alignItems: "center",
        flexDirection: "column",
        transition: "0.3s",
        scrollbarColor: "#22a770",
        scrollbarWidth: "thin",
        overflowY: "auto",
        opacity: openModal ? 1 : 0,
        visibility: openModal ? "visible" : "hidden",
      }}
    >
      <div
        className="device-box"
        px={3}
        style={{
          padding: "30px 30px",
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          width: "100%",
          height: "auto",
          // overflowY: 'auto',
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          opacity: openModal ? 1 : 0,
          transform: openModal ? "scale(1)" : "scale(0)",
        }}
      >
        <Button
          variant="link"
          onClick={() => handleClose()}
          style={{ marginLeft: "auto", fontSize: "30px", color: "white" }}
        >
          <X />
        </Button>
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
