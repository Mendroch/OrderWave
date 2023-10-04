import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../assets/styles/GlobalStyle";
import { theme } from "../assets/styles/theme";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client">
            <Route path="menu" element={<h1>Menu</h1>} />
            <Route path="details" element={<h1>Details</h1>} />
            <Route path="checkout" element={<h1>Checkout</h1>} />
            <Route path="" element={<Navigate to="menu" />} />
            <Route path="*" element={<Navigate to="menu" />} />
          </Route>
          <Route path="/owner">
            <Route path="orders" element={<h1>Orders</h1>} />
            <Route path="dishes" element={<h1>Dishes</h1>} />
            <Route path="" element={<Navigate to="orders" />} />
            <Route path="*" element={<Navigate to="orders" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
