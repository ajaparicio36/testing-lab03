import React from "react";
import {
	render,
	waitFor,
	fireEvent,
	getByText,
	getByRole,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NavBar from "../src/components/NavBar";

describe("NavBar", () => {
	const isLoggedIn = true;
	const adminStatus = true;
	const balance = 100.0;
	const handleLogout = jest.fn();
	const handleLogin = jest.fn();
	const handleRegister = jest.fn();
	const handleEdit = jest.fn();

	const renderNavBar = () =>
		render(
			<NavBar
				isLoggedIn={isLoggedIn}
				adminStatus={adminStatus}
				balance={balance}
				handleLogout={handleLogout}
				handleLogin={handleLogin}
				handleRegister={handleRegister}
				handleEdit={handleEdit}
			/>,
		);

	it("renders navigation bar with login status", () => {
		const { getByText } = renderNavBar();
		expect(getByText("Hello,")).toBeInTheDocument();
	});

	it("renders navigation bar with admin status", () => {
		const { getByText } = renderNavBar();
		expect(getByText("Admin")).toBeInTheDocument();
	});

	it("renders balance display", () => {
		const { getByText } = renderNavBar();
		expect(getByText("$100.00")).toBeInTheDocument();
	});

	it("calls handleLogout when logout button is clicked", async () => {
		const { getByRole } = renderNavBar();
		const logoutButton = getByRole("button", { name: "Log Out" });
		userEvent.click(logoutButton);
		await waitFor(() => expect(handleLogout).toHaveBeenCalledTimes(1));
	});

	it("calls handleLogin when login button is clicked", async () => {
		const { getByRole } = renderNavBar();
		const loginButton = getByRole("button", { name: "Log In" });
		userEvent.click(loginButton);
		await waitFor(() => expect(handleLogin).toHaveBeenCalledTimes(1));
	});

	it("calls handleRegister when register button is clicked", async () => {
		const { getByRole } = renderNavBar();
		const registerButton = getByRole("button", { name: "Register" });
		userEvent.click(registerButton);
		await waitFor(() => expect(handleRegister).toHaveBeenCalledTimes(1));
	});

	it("renders popup menu when profile icon is clicked", async () => {
		const { getByRole } = renderNavBar();
		const profileIcon = getByRole("button", { name: "Profile" });
		userEvent.click(profileIcon);
		await waitFor(() => expect(getByRole("menu")).toBeInTheDocument());
	});
});
