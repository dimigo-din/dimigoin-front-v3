import React from "react";
import styled from "@emotion/styled";

import Router from "./router";
import GlobalStyle from "./components/GlobalStyle";
import { ModalContainer } from "./components/DimiModal";
import "./webfont";

import dimigoBackgroundImage from "./assets/dimigo-background.svg";

function App() {
  return (
    <>
      <GlobalStyle />
      <ModalContainer />
      <Container>
        <TopLine />
        <RouterWrap>
          <Router />
        </RouterWrap>
        <BottomImage src={dimigoBackgroundImage} />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const TopLine = styled.div`
  width: 100%;
  height: 12px;
  background-color: #3c70e8;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const RouterWrap = styled.main`
  flex: 1 0 auto;
`;

const BottomImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100vw;
`;
