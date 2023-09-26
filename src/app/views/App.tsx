import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "../assets/styles/GlobalStyle";
import { theme } from '../assets/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <h1>Here will be app for food delivering</h1>
    </ThemeProvider>
  )
}

export default App
