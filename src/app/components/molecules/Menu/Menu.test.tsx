import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../assets/styles/theme";
import Menu from "./Menu";
import { ISections } from "../../../types/Sections";

const mockSections: ISections = [
  {
    _id: "s1",
    name: "Starters",
    isAvailable: true,
    hoursOfAvailability: [{ start: "08:00", end: "22:00", _id: "h1" }],
  },
  {
    _id: "s2",
    name: "Main Courses",
    isAvailable: true,
    hoursOfAvailability: [{ start: "08:00", end: "22:00", _id: "h2" }],
  },
  {
    _id: "s3",
    name: "Desserts",
    isAvailable: true,
    hoursOfAvailability: [{ start: "08:00", end: "22:00", _id: "h3" }],
  },
];

const renderMenu = (sections: ISections = mockSections) => {
  return render(
    <ThemeProvider theme={theme}>
      <Menu sections={sections} />
    </ThemeProvider>
  );
};

describe("Menu", () => {
  it("should render 'Menu' header", () => {
    renderMenu();

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("should render all section names as buttons", () => {
    renderMenu();

    expect(screen.getByText("Starters")).toBeInTheDocument();
    expect(screen.getByText("Main Courses")).toBeInTheDocument();
    expect(screen.getByText("Desserts")).toBeInTheDocument();
  });

  it("should render correct number of section buttons", () => {
    renderMenu();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("should render empty sections list", () => {
    renderMenu([]);

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should handle section button click without errors", () => {
    renderMenu();

    const button = screen.getByText("Starters");
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
