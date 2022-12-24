import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onDismiss?: () => void;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  children,
  onDismiss,
}: Props) => {
  
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={!!onDismiss}
        onRequestClose={onDismiss}
      >
        {children}
      </ReactModal>
      
    </>
  );
};