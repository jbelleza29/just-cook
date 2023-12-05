import './Modal.scss';
import { createPortal } from 'react-dom';

const Backdrop = ({ onClose }) => {
  return <div className="Backdrop" onClick={onClose}></div>;
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {createPortal(
        <div className="Modal">
          <div className="Modal__content">
            <span className="Modal__close" onClick={onClose}>
              &times;
            </span>
            {children}
          </div>
        </div>,
        document.getElementById('modal-root')!
      )}
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default Modal;
