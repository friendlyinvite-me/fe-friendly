import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onDismiss?: () => void;
  width?: string;
}



export const Modal: React.FC<Props> = ({
  isOpen,
  children,
  onDismiss,
  width = '500px',
}: Props) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px',
      maxWidth: width,
      width: '95%',
      border: '1px solid',
      borderColor: '#E9E9E9',
    },

  };
  
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={!!onDismiss}
      onRequestClose={onDismiss}
      style={customStyles}
      overlayClassName="ModalOverlay"
    >
      {children}
    </ReactModal>
      
  );
};