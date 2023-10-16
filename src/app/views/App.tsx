import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../assets/styles/GlobalStyle";
import { theme } from "../assets/styles/theme";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import OwnerTemplate from "../components/templates/OwnerTemplate/OwnerTemplate";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/client">
            <Route index element={<Navigate to="menu" />} />
            <Route path="menu" element={<h1>Menu</h1>} />
            <Route path="details" element={<h1>Details</h1>} />
            <Route path="checkout" element={<h1>Checkout</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
          <Route path="/owner" element={<OwnerTemplate />}>
            <Route index element={<Navigate to="orders" />} />
            <Route path="orders" element={<Orders />} />
            <Route path="dishes" element={<h1>Dishes</h1>} />
            <Route path="sections" element={<h1>Sections</h1>} />
            <Route path="restaurant" element={<h1>Restaurant</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
