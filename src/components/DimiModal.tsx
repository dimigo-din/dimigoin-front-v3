import React, { useState, useEffect, ReactNode } from "react";
import styled from "@emotion/styled";
import DimiCard from "./dimiru/DimiCard";

// export let show: () => void;
export let show: (el: (close: () => void) => ReactNode) => void;
export const ModalContainer = () => {
  const [ModalElement, setModalElement] = useState<ReactNode>();
  const [visible, setVisivility] = useState(false);
  useEffect(() => {
    show = (el: (close: () => void) => ReactNode) => {
      setModalElement(el(() => setVisivility(false)));
      setVisivility(true);
    };
  }, []);
  return visible && ModalElement ? (
    <FullBack onClick={() => setVisivility(false)}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <Card>{ModalElement}</Card>
      </ModalWrapper>
    </FullBack>
  ) : null;
};

const FullBack = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  /* let */
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  animation: appear 100ms forwards;

  @keyframes appear {
    from {
      background-color: rgba(0, 0, 0, 0);
      visibility: hidden;
    }
    to {
      background-color: rgba(0, 0, 0, 0.1);
      visibility: visible;
    }
  }
`;
const ModalWrapper = styled.div`
  width: 720px;
  margin: auto;
`;
const Card = styled(DimiCard)`
  padding: 32px 45px 32px;
  border-top: 5px solid #3c70e8;
`;
