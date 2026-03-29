import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import ListItem from "./ListItem";

const renderListItem = (name: string, id: string) => {
  return render(
    <ThemeProvider theme={theme}>
      <ListItem name={name} id={id} />
    </ThemeProvider>
  );
};

describe("ListItem", () => {
  it("should render item name", () => {
    renderListItem("Pizza Section", "section-1");

    expect(screen.getByText("Pizza Section")).toBeInTheDocument();
  });

  it("should render preview, edit, and delete buttons", () => {
    renderListItem("Pizza Section", "section-1");

    expect(screen.getByAltText("preview icon")).toBeInTheDocument();
    expect(screen.getByAltText("edit icon")).toBeInTheDocument();
    expect(screen.getByAltText("bin icon")).toBeInTheDocument();
  });

  it("should have three action buttons", () => {
    renderListItem("Pizza Section", "section-1");

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("should set the correct id on the wrapper div", () => {
    const { container } = renderListItem("Pizza Section", "section-1");

    const idDiv = container.querySelector("#section-1");
    expect(idDiv).toBeInTheDocument();
  });
});
