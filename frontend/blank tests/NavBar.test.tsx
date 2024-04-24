import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar";

describe("NavBar", () => {
	it("renders navigation bar with login status", () => {
		const { getByText } = render(
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>,
		);

		expect(getByText("Login")).toBeInTheDocument();
	});

	it("renders navigation bar with admin status", () => {
		const { getByText } = render(
			<BrowserRouter>
				<NavBar adminStatus={true} />
			</BrowserRouter>,
		);

		expect(getByText("Admin Dashboard")).toBeInTheDocument();
	});

	it("renders balance display", () => {
		const { getByText } = render(
			<BrowserRouter>
				<NavBar balance={100} />
			</BrowserRouter>,
		);

		expect(getByText("Balance: 100")).toBeInTheDocument();
	});

	it("calls handleLogout when logout button is clicked", () => {
		const handleLogout = jest.fn();
		const { getByText } = render(
			<BrowserRouter>
				<NavBar handleLogout={handleLogout} />
			</BrowserRouter>,
		);

		const logoutButton = getByText("Logout");
		fireEvent.click(logoutButton);

		expect(handleLogout).toHaveBeenCalledTimes(1);
	});

	it("calls handleLogin when login button is clicked", () => {
		const handleLogin = jest.fn();
		const { getByText } = render(
			<BrowserRouter>
				<NavBar handleLogin={handleLogin} />
			</BrowserRouter>,
		);

		const loginButton = getByText("Login");
		fireEvent.click(loginButton);

		expect(handleLogin).toHaveBeenCalledTimes(1);
	});

	it("calls handleRegister when register button is clicked", () => {
		const handleRegister = jest.fn();
		const { getByText } = render(
			<BrowserRouter>
				<NavBar handleRegister={handleRegister} />
			</BrowserRouter>,
		);

		const registerButton = getByText("Register");
		fireEvent.click(registerButton);

		expect(handleRegister).toHaveBeenCalledTimes(1);
	});

	it("renders popup menu when profile icon is clicked", () => {
		const { getByRole } = render(
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>,
		);

		const profileIcon = getByRole("button", { name: "Profile" });
		fireEvent.click(profileIcon);

		expect(getByRole("menu")).toBeInTheDocument();
	});
});
