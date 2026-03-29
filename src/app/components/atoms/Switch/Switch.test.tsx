import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import Switch from "./Switch";

const renderSwitch = (register: object, defaultValue?: boolean) => {
  return render(
    <ThemeProvider theme={theme}>
      <Switch register={register} defaultValue={defaultValue} />
    </ThemeProvider>
  );
};

describe("Switch", () => {
  const mockRegister = {};

  it("should render a checkbox input", () => {
    renderSwitch(mockRegister);

    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it("should be checked by default", () => {
    renderSwitch(mockRegister);

    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.defaultChecked).toBe(true);
  });

  it("should not be checked when defaultValue is false", () => {
    renderSwitch(mockRegister, false);

    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.defaultChecked).toBe(false);
  });

  it("should toggle when clicked", () => {
    renderSwitch(mockRegister, true);

    const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
  });
});
