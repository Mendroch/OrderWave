import { ModalWrapper } from "./Modal.styles";
import "./Modal.css";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, handleClose, children }: ModalProps) => {
  return (
    <ModalWrapper
      appElement={document.getElementById("modal-container") || undefined}
      isOpen={isOpen}
      onRequestClose={handleClose}
      closeTimeoutMS={150}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      {children}
    </ModalWrapper>
  );
};

export default Modal;
