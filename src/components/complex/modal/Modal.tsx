import React, { useState, useEffect, ReactNode, useCallback } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";

export interface ModalOption {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}

export let showModal: (
  el: (close: () => Promise<void>) => ReactNode,
  props?: ModalOption,
  onClose?: () => void
) => void;
export const ModalContainer = () => {
  const [ModalElement, setModalElement] = useState<ReactNode>();
  const [props, setProps] = useState<ModalOption>();
  const [visible, setVisivility] = useState(false);
  const [onClose, setOnClose] = useState<() => void>();
  const [disappearingAnimation, setDisappearingAnimation] = useState(false);
  const disappear = useCallback(() => new Promise<void>((suc) => {
    onClose && onClose();
    setDisappearingAnimation(true);
    setTimeout(() => {
      setVisivility(false)
      suc()
    }, 600);
  }), [onClose]);
  useEffect(() => {
    showModal = (
      el: (close: () => Promise<void>) => ReactNode,
      props?: ModalOption,
      onCloseListener?
    ) => {
      if (onCloseListener) setOnClose(() => onCloseListener);
      else setOnClose(undefined);
      setModalElement(
        el(() =>
          disappear()
        )
      );
      setVisivility(true);
      setDisappearingAnimation(false);
      if (props) setProps(props);
    };
  }, [disappear]);
  return visible && ModalElement ? (
    <Backdrop
      onClick={disappear}
      visible={disappearingAnimation}
      {...props?.backdropProps}
    >
      <Wrapper onClick={(e) => e.stopPropagation()} {...props?.wrapperProps} disappear={disappearingAnimation}>
        {ModalElement}
      </Wrapper>
    </Backdrop>
  ) : null;
};

export const Backdrop = styled.div<{ visible?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0px;
  left: 0px;
  overflow-y: scroll;
  backdrop-filter: blur(2px);
  animation: appear 600ms cubic-bezier(0, 0.75, 0.21, 1) forwards;
  display: grid;
  place-items: center;

  ${({ visible }) =>
    visible &&
    css`
      animation: disappear 600ms cubic-bezier(0, 0.75, 0.21, 1) forwards;
    `}
  @keyframes appear {
    from {
      background-color: rgba(0, 0, 0, 0);
      visibility: hidden;
      opacity: 0;
    }
    to {
      background-color: rgba(0, 0, 0, 0.1);
      visibility: visible;
    }
  }

  @keyframes disappear {
    from {
      background-color: rgba(0, 0, 0, 0.1);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
      opacity: 0;
    }
  }
`;

const Wrapper = styled.div<{ disappear: boolean }>`
  box-sizing: border-box;
  animation: ContentEnter 300ms cubic-bezier(0, 0.75, 0.21, 1) forwards;
  
  ${({ disappear }) =>
    disappear &&
    css`
      animation: ContentExit 600ms cubic-bezier(0, 0.75, 0.21, 1) forwards;
    `}

  @keyframes ContentEnter {
      from {
          opacity: 0;
          transform: scale(0.995);
      }
      to {
          opacity: 1;
          transform: scale(1);
      }
  }
  @keyframes ContentExit {
      from {
          opacity: 1;
          transform: scale(1);
      }
      to {
          opacity: 0;
          /* display: none; */
          transform: scale(0.995);
      }
  }

`;
