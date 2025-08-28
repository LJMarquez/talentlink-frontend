import React, { useEffect, useRef } from 'react';
import '../styles/ConfirmAdminModal.css';

const ConfirmAdminModal = ({ show, onClose, onConfirm, message, buttonLabel }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const trapFocus = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener('keydown', trapFocus);
      document.addEventListener('mousedown', handleClickOutside);
      firstElement.focus();

      return () => {
        document.removeEventListener('keydown', trapFocus);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  const buttonClass = message.includes('approve') ? 'button approve' : message.includes('reject') ? 'button reject' : 'button';
  const doneButtonClass = buttonLabel === "Done" ? 'button cancel' : buttonClass;

  return (
    <div className="modal-overlay" tabIndex="-1">
      <div className="modal-content" ref={modalRef}>
        <h2>{message}</h2>
        <div className="modal-buttons">
          <button onClick={onConfirm} className={doneButtonClass}>{buttonLabel}</button>
          {buttonLabel !== "Done" && <button onClick={onClose} className="button cancel">No</button>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAdminModal;