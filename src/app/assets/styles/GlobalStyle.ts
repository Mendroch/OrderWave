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
    background: ${({ theme }) => theme.colors.lightGray};
  }

  a, button, div, label {
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  p {
    margin: 0;
  }
`;
