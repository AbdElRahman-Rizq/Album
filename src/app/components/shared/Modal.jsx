'use client'

import './modal.css';

const Modal = ({ isAppear, onClose, children }) => {
  if (!isAppear) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: "1000" }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
