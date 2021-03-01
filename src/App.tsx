import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './toastStyle.css';

import Router from './router';
import GlobalStyle from './components/GlobalStyle';
import { ModalContainer } from './components';
import './webfont';

function App() {
  return (
    <>
      <GlobalStyle />
      <ModalContainer />
      <ToastContainer />
      <RouterWrap>
        <Router />
      </RouterWrap>
    </>
  );
}

export default App;

const RouterWrap = styled.main`
  /* flex: 1 0 auto;
  padding-bottom: 20px; */
`;
