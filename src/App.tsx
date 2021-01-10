import React from "react";
import styled from "@emotion/styled";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Router from "./router";
import GlobalStyle from "./components/GlobalStyle";
import { ModalContainer } from "./components/complex/modal/Modal";
import "./webfont";
import dimigoBackgroundImage from "./assets/dimigo-background.svg";

function App() {
  return (
    <>
      <GlobalStyle />
      <ModalContainer />
      <ToastContainer />
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
  background-color: var(--main-theme-accent);
`;

const RouterWrap = styled.main`
  flex: 1 0 auto;
  padding-bottom: 20px;
`;

const BottomImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100vw;
`;
