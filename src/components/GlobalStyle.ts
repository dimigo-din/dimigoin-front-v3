import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${styledReset}

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    font-family: 'NanumSquareRound', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif !important;
  }

  html {
    background-color: #fbfbfb;
  }

  ::selection {
    background: #5586fa;
    color: rgba(255, 255, 255, 0.95);
  }

  #root {
    font-family: 'NanumSquareRound', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;
