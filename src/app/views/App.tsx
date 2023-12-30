import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../assets/styles/GlobalStyle";
import { theme } from "../assets/styles/theme";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import OwnerTemplate from "../components/templates/OwnerTemplate/OwnerTemplate";
import { store } from "../store/store";
import Dishes from "./Dishes/Dishes";
import NewDish from "./NewDish/NewDish";
import EditDish from "./EditDish/EditDish";

const App = () => {
  return (
    <Suspense fallback="loading">
      <Provider store={store}>
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
                <Route path="dishes" element={<Dishes />} />
                <Route path="newdish" element={<NewDish />} />
                <Route path="editdish" element={<EditDish />} />
                <Route path="sections" element={<h1>Sections</h1>} />
                <Route path="restaurant" element={<h1>Restaurant</h1>} />
                <Route path="*" element={<h1>404</h1>} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
