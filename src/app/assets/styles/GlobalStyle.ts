import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    box-sizing: border-box;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.white};
    overflow: hidden;
  }
  
  a, button {
    font-family: 'Inter', sans-serif;
  }

  a, button {
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  p {
    margin: 0;
  }
`;
