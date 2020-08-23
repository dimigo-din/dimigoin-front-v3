import React, { useState, useEffect, ReactNode } from "react";
import styled from "@emotion/styled";
import DimiCard, { IDimiCard } from "./dimiru/DimiCard";
import css, { SerializedStyles } from "@emotion/css";

interface IModalProps {
  cardProps?: IDimiCard & {
    css?: SerializedStyles;
  };
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}

export let show: (
  el: (close: () => void) => ReactNode,
  props?: IModalProps
) => void;
export const ModalContainer = () => {
  const [ModalElement, setModalElement] = useState<ReactNode>();
  const [props, setProps] = useState<IModalProps>();
  const [visible, setVisivility] = useState(false);
  const [disappearingAnimation, setDisappearingAnimation] = useState(false);
  const disappear = () => {
    setDisappearingAnimation(true);
    setTimeout(() => setVisivility(false), 300);
  };
  useEffect(() => {
    show = (el: (close: () => void) => ReactNode, props?: IModalProps) => {
      setModalElement(el(disappear));
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
        <Card {...props?.cardProps}>{ModalElement}</Card>
      </Wrapper>
    </Backdrop>
  ) : null;
};

const Backdrop = styled.div<{ visible: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  animation: appear 300ms forwards;

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
  width: 720px;
  margin: auto;
`;
const Card = styled(DimiCard)`
  padding: 32px 45px 32px;
  border-top: 5px solid #3c70e8;
`;
