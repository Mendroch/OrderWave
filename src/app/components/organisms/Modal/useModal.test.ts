import { renderHook, act } from "@testing-library/react";
import useModal from "./useModal";

describe("useModal", () => {
  it("should start closed by default", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should start open when initialState is true", () => {
    const { result } = renderHook(() => useModal(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("should open modal when handleOpenModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleOpenModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close modal when handleCloseModal is called", () => {
    const { result } = renderHook(() => useModal(true));

    act(() => {
      result.current.handleCloseModal();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle between open and closed states", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.handleOpenModal();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleCloseModal();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
