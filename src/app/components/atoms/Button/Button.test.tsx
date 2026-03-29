import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import Button from "./Button";

const renderButton = (props: { isActive?: boolean; onClick: () => void; children: React.ReactNode }) => {
  return render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );
};

describe("Button", () => {
  it("should render children text", () => {
    renderButton({ onClick: jest.fn(), children: "Click me" });

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick when active and clicked", () => {
    const onClick = jest.fn();
    renderButton({ onClick, children: "Click me" });

    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when inactive and clicked", () => {
    const onClick = jest.fn();
    renderButton({ isActive: false, onClick, children: "Click me" });

    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should be active by default", () => {
    const onClick = jest.fn();
    renderButton({ onClick, children: "Click me" });

    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalled();
  });

  it("should render with active styles when isActive is true", () => {
    renderButton({ isActive: true, onClick: jest.fn(), children: "Active" });

    const button = screen.getByText("Active");
    expect(button).toBeInTheDocument();
  });
});
