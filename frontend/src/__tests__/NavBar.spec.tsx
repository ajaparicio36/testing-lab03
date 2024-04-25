import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
	it("renders navigation bar with correct elements", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
		);

		expect(
			screen.getByText((content, element) => content.startsWith("Ph")),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: (name) => name.startsWith("Account"),
			}),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: (name) => name.startsWith("Log In") }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: (name) => name.startsWith("Register"),
			}),
		).toBeInTheDocument();
	});

	it("toggles pop-up visibility when account button is clicked", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
		);

		const accountButton = screen.getByRole("button", {
			name: (name) => name.startsWith("Account"),
		});
		fireEvent.click(accountButton);

		expect(screen.queryByRole("popup")).toBeInTheDocument();

		fireEvent.click(accountButton);
		expect(screen.queryByRole("popup")).not.toBeInTheDocument();
	});

	it("navigates to login page when log in button is clicked", () => {
		const { history } = render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
		);

		const loginButton = screen.getByRole("button", {
			name: (name) => name.startsWith("Log In"),
		});
		fireEvent.click(loginButton);

		expect(history.location.pathname).toBe("/login");
	});

	it("navigates to register page when register button is clicked", () => {
		const { history } = render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
		);

		const registerButton = screen.getByRole("button", {
			name: (name) => name.startsWith("Register"),
		});
		fireEvent.click(registerButton);

		expect(history.location.pathname).toBe("/register");
	});

	it("logs out and clears local storage when log out button is clicked", () => {
		const { localStorage } = render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>,
		);

		const logoutButton = screen.getByRole("button", {
			name: (name) => name.startsWith("Log Out"),
		});
		fireEvent.click(logoutButton);

		expect(localStorage.getItem("token")).toBeNull();
	});

	it("renders admin link when admin status is true", () => {
		render(
			<MemoryRouter>
				<NavBar adminStatus={true} />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole("link", { name: (name) => name.startsWith("Admin") }),
		).toBeInTheDocument();
	});
});
