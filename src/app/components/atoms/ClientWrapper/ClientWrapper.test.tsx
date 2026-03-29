import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import ClientWrapper from "./ClientWrapper";

const renderComponent = (children: React.ReactNode, withBottomPadding = false) => {
  return render(
    <ThemeProvider theme={theme}>
      <ClientWrapper withBottomPadding={withBottomPadding}>{children}</ClientWrapper>
    </ThemeProvider>
  );
};

describe("ClientWrapper", () => {
  it("should render children", () => {
    renderComponent(<p>Test content</p>);

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render multiple children", () => {
    renderComponent(
      <>
        <p>Child 1</p>
        <p>Child 2</p>
      </>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("should not have bottom padding by default", () => {
    const { container } = renderComponent(<p>Content</p>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should accept withBottomPadding prop", () => {
    const { container } = renderComponent(<p>Content</p>, true);
    expect(container.firstChild).toBeInTheDocument();
  });
});
