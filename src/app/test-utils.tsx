import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { theme } from "./assets/styles/theme";
import cartReducer from "./features/cart-slice";
import { ICartDish } from "./types/CartDish";

interface CartPreloadedState {
  cart?: { dishes: ICartDish[] };
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: CartPreloadedState;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: preloadedState as { cart: { dishes: ICartDish[] } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
