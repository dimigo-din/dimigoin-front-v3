import { createGlobalStyle } from "styled-components";
import styledReset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${styledReset}
  @font-face { font-family: 'NanumSquareRound'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff'); font-weight: normal; font-style: normal; }
  :root {
    --main-theme-accent: #E83C77;
    --main-theme-accent-rgb: 232, 60, 119;
    --main-theme-accent-background: #FFFBFC;
  }
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    font-family: 'NanumSquare', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif;
  }

  html {
    background-color: #fbfbfb;
  }

  ::selection {
    background: #5586fa;
    color: rgba(255, 255, 255, 0.95);
  }

  #root {
    font-family: 'NanumSquare', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif;
    /* overflow-x: hidden; */
  }
`;

export default GlobalStyle;
