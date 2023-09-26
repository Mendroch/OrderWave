import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }
  
  a, button {
    font-family: 'Inter', sans-serif;
  }

  a, button {
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;
