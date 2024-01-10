import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../assets/styles/GlobalStyle";
import { theme } from "../assets/styles/theme";
import { store } from "../store/store";
import Template from "../components/templates/Template/Template";
import Orders from "./Orders/Orders";
import Dishes from "./Dishes/Dishes";
import NewDish from "./NewDish/NewDish";
import EditDish from "./EditDish/EditDish";
import Sections from "./Sections/Sections";
import NewSection from "./NewSection/NewSection";
import EditSection from "./EditSection/EditSection";
import Restaurant from "./Restaurant/Restaurant";
import EditRestaurant from "./EditRestaurant/EditRestaurant";
import LandingPage from "./LandingPage/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import Details from "./Details/Detail";
import Checkout from "./Checkout/Checkout";
import OrderSummary from "./OrderSummary/OrderSummary";

const App = () => {
  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/client" element={<Template type="client" />}>
                <Route index element={<Navigate to="menu" />} />
                <Route path="menu" element={<Dashboard />} />
                <Route path="details" element={<Details />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="summary" element={<OrderSummary />} />
                <Route path="*" element={<h1>404</h1>} />
              </Route>
              <Route path="/owner" element={<Template type="owner" />}>
                <Route index element={<Navigate to="orders" />} />
                <Route path="orders" element={<Orders />} />
                <Route path="dishes" element={<Dishes />} />
                <Route path="newdish" element={<NewDish />} />
                <Route path="editdish" element={<EditDish />} />
                <Route path="sections" element={<Sections />} />
                <Route path="newsection" element={<NewSection />} />
                <Route path="editsection" element={<EditSection />} />
                <Route path="restaurant" element={<Restaurant />} />
                <Route path="editrestaurant" element={<EditRestaurant />} />
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
