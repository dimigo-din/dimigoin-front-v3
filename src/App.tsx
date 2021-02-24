import React from "react";
import styled from "@emotion/styled";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './toastStyle.css'

import Router from "./router";
import GlobalStyle from "./components/GlobalStyle";
import { ModalContainer } from "./components";
import "./webfont";
import dimigoBackgroundImage from "./assets/dimigo-background.svg";

function App() {
  return (
    <>
      <GlobalStyle />
      <ModalContainer />
      <ToastContainer />
        <RouterWrap>
          <Router />
        </RouterWrap>
        <BottomImage src={dimigoBackgroundImage} />
    </>
  );
}

export default App;

const RouterWrap = styled.main`
  /* flex: 1 0 auto;
  padding-bottom: 20px; */
`;

const BottomImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100vw;
`;
