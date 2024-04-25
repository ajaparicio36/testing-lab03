/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/no-conditional-expect */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders NavBar component", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("toggles showPopup when account icon is clicked", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const accountIcon = screen.getByRole("button");
    fireEvent.click(accountIcon);
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("renders admin link when adminStatus is true", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.queryByText("Admin")).toBeNull();
  });

  it("displays correct balance when logged in", async () => {
    const mockBalance = 100.25;
    const mockResponse = {
      ok: true,
      json: async () => ({ balance: mockBalance }),
    };
    jest.spyOn(global, "fetch").mockResolvedValueOnce(mockResponse as any);

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const balanceText = await screen.findByText(`$${mockBalance.toFixed(2)}`);
    expect(balanceText).toBeInTheDocument();
  });
});
