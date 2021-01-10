import React, { useState, useEffect, ReactNode } from "react";
import styled from "@emotion/styled";
import DimiCard, { IDimiCard } from "./dimiru/DimiCard";
import css, { SerializedStyles } from "@emotion/css";

export interface IModalProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}

export let show: (
  el: (close: () => void) => ReactNode,
  props?: IModalProps,
  onClose?: () => void
) => void;
export const ModalContainer = () => {
  const [ModalElement, setModalElement] = useState<ReactNode>();
  const [props, setProps] = useState<IModalProps>();
  const [visible, setVisivility] = useState(false);
  const [onClose, setOnClose] = useState<() => void>();
  const [disappearingAnimation, setDisappearingAnimation] = useState(false);
  const disappear = () => {
    onClose && onClose();
    setDisappearingAnimation(true);
    setTimeout(() => setVisivility(false), 300);
  };
  useEffect(() => {
    show = (
      el: (close: () => void) => ReactNode,
      props?: IModalProps,
      onCloseListener?
    ) => {
      if (onCloseListener) setOnClose(() => onCloseListener);
      else setOnClose(undefined);
      setModalElement(
        el(() => {
          disappear();
        })
      );
      setVisivility(true);
      setDisappearingAnimation(false);
      if (props) setProps(props);
      console.log(props);
    };
  }, []);
  return visible && ModalElement ? (
    <Backdrop
      onClick={disappear}
      visible={disappearingAnimation}
      {...props?.backdropProps}
    >
      <Wrapper onClick={(e) => e.stopPropagation()} {...props?.wrapperProps}>
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
  animation: appear 300ms forwards;
  display: grid;
  place-items: center;

  ${({ visible }) =>
    visible &&
    css`
      animation: disappear 300ms forwards;
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
const Wrapper = styled.div`
  box-sizing: border-box;
`;
