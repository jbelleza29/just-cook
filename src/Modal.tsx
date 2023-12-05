import './Modal.scss';
import { createPortal } from 'react-dom';

type SharedProps = {
  onClose: () => void;
};

type ModalProps = SharedProps & {
  children: React.ReactNode;
};

const Backdrop = ({ onClose }: SharedProps) => {
  return <div className="Backdrop" onClick={onClose}></div>;
};

const Modal = ({ onClose, children }: ModalProps) => {
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
