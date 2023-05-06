import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const onCloseKey = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() =>{
    window.addEventListener('keydown', onCloseKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onCloseKey);
      document.body.style.overflow = 'auto';
    };
  },[onClose])

  const onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={onCloseBackdrop}>
      <ModalEl>{children}</ModalEl>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
