import React, { useEffect } from "react";
import ReactDom from "react-dom";

import style from "./Modal.module.css";
import { IoCloseCircle } from "react-icons/io5";

const BackDrop = ({ closeModal }) => {
  return <div className={style.backdrop} onClick={closeModal}></div>;
};

const Overlay = ({ body, closeModal, styles }) => {
  return (
    <div className={style.overlay} style={styles}>
      <div className={style.closeButton}>
        <IoCloseCircle onClick={closeModal} />
      </div>
      {body}
    </div>
  );
};

const Modal = ({ children, isAppear, onClose, styles }) => {
  // Create the modal container dynamically if it doesn't exist
  useEffect(() => {
    let modalRoot = document.getElementById("modal");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal";
      document.body.appendChild(modalRoot);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const modalRoot = document.getElementById("modal");

  return (
    isAppear &&
    ReactDom.createPortal(
      <>
        <BackDrop closeModal={onClose} />
        <Overlay
          styles={{
            ...styles,
            overflow: "auto",
            maxHeight: "100vh",
            maxWidth: "90vw",
          }}
          closeModal={onClose}
          body={children}
        />
      </>,
      modalRoot
    )
  );
};

export default Modal;
