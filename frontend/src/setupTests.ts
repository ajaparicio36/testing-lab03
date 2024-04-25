// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "resize-observer-polyfill";

// src/setupTests.ts
interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

class MockResizeObserver implements ResizeObserver {
  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    // Do nothing
  }

  unobserve(target: Element): void {
    // Do nothing
  }

  disconnect(): void {
    // Do nothing
  }
}

const mockResizeObserver = () => {
  if (typeof global.ResizeObserver !== "undefined") {
    // ResizeObserver is already defined, do nothing
    return;
  }

  global.ResizeObserver = MockResizeObserver;
};

mockResizeObserver();
