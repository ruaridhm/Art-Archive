import React, { ReactNode, useRef } from 'react';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKey from '../../hooks/useKey';
import { ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import {
  ModalWrapper,
  ModalHeader,
  HeaderText,
  ModalClose,
  ModalContent,
  ModalBody,
  ModalBodyHeader,
  ModalBodyContainer,
  ModalFooter,
  ModalBackground,
} from './Style';
interface ModalProps {
  headerText: string;
  bodyHeaderText?: string;
  bodyText: string | ReactNode;
  close: () => void;
  confirm: () => void;
  confirmText?: string;
  confirmStyle?: string;
  cancelStyle?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelIcon?: JSX.Element;
  confirmIcon?: JSX.Element;
  confirmSize?: string;
  cancelSize?: string;
}

const Modal = ({
  headerText,
  bodyHeaderText,
  bodyText,
  close,
  confirm,
  confirmText,
  showCancel = true,
  showConfirm = true,
  cancelIcon,
  confirmIcon,
}: ModalProps): ReactElement => {
  useKey('Escape', close);
  const outsideClickRef = useRef();

  useOnClickOutside(outsideClickRef, () => close());

  return (
    // <TransitionGroup>
    //   <CSSTransition timeout={500} classNames='item'>
    <ModalBackground>
      <ModalWrapper ref={outsideClickRef} className='wrapper'>
        <ModalHeader>
          <HeaderText>{headerText}</HeaderText>
          <ModalClose onClick={close}>x</ModalClose>
        </ModalHeader>
        <ModalContent>
          <ModalBodyContainer>
            <ModalBodyHeader>{bodyHeaderText}</ModalBodyHeader>
            <ModalBody>{bodyText}</ModalBody>
          </ModalBodyContainer>
          <ModalFooter>
            {showCancel && (
              <Button
                onClick={close}
                variant='contained'
                startIcon={cancelIcon}
              >
                Cancel
              </Button>
            )}
            {showConfirm && (
              <Button
                onClick={confirm}
                variant='contained'
                size='medium'
                startIcon={confirmIcon}
              >
                {confirmText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </ModalBackground>
    // </CSSTransition>
    //</TransitionGroup>
  );
};

export default Modal;
