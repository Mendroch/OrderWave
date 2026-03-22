/// <reference types="vite/client" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      lightGray: string;
      semiLightGray: string;
      gray: string;
      darkGray: string;
      veryDarkGray: string;
      black: string;
      lightPurple: string;
      purple: string;
      darkPurple: string;
      lightYellow: string;
      lightRed: string;
      red: string;
      lightGreen: string;
      green: string;
      patternsBlue: string;
      ateneoBlue: string;
      shadow: string;
    };
    fontSize: {
      xxl: string;
      xl: string;
      l: string;
      m: string;
      s: string;
      xs: string;
    };
    width: {
      container: string;
      dashboardContainer: string;
    };
  }
}
