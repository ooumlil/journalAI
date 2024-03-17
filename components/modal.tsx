import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="modal absolute top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2 h-auto p-8 text-slate-800 dark:text-white dark:bg-slate-900 rounded-xl backdrop-blur-xl">
      <button onClick={onClose} className="modal-close absolute top-3 left-3 hover:animate-pulse">
        X
      </button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
