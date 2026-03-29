/**
 * @jest-environment jsdom
 */
import { checkActivity } from "./checkActivity";

describe("checkActivity", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should return false when orderDishes list does not exist", () => {
    expect(checkActivity()).toBe(false);
  });

  it("should return true when all checkboxes are checked", () => {
    document.body.innerHTML = `
      <div id="orderDishes">
        <input type="checkbox" checked />
        <input type="checkbox" checked />
        <input type="checkbox" checked />
      </div>
    `;

    expect(checkActivity()).toBe(true);
  });

  it("should return false when at least one checkbox is unchecked", () => {
    document.body.innerHTML = `
      <div id="orderDishes">
        <input type="checkbox" checked />
        <input type="checkbox" />
        <input type="checkbox" checked />
      </div>
    `;

    expect(checkActivity()).toBe(false);
  });

  it("should return false when no checkboxes are checked", () => {
    document.body.innerHTML = `
      <div id="orderDishes">
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
    `;

    expect(checkActivity()).toBe(false);
  });

  it("should return true when the list has no checkboxes", () => {
    document.body.innerHTML = `
      <div id="orderDishes">
        <input type="text" />
        <input type="number" />
      </div>
    `;

    expect(checkActivity()).toBe(true);
  });

  it("should return true when the list is empty", () => {
    document.body.innerHTML = `<div id="orderDishes"></div>`;

    expect(checkActivity()).toBe(true);
  });

  it("should ignore non-checkbox inputs", () => {
    document.body.innerHTML = `
      <div id="orderDishes">
        <input type="text" value="test" />
        <input type="checkbox" checked />
      </div>
    `;

    expect(checkActivity()).toBe(true);
  });
});
