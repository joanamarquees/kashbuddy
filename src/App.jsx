import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { Accounts } from "./pages/accounts/index";
import { Auth } from "./pages/auth/index";
import { Home } from "./pages/home/index";
import { NotFound } from "./pages/notFound/index";
import { Categories } from "./pages/settings/categories/index";
import { Settings } from "./pages/settings/index";

function App() {
	useEffect(() => {
		const splash = document.getElementById("splash-screen");
		if (splash) {
			// Wait 5 seconds before starting the fade-out
			const fadeTimer = setTimeout(() => {
				// Add fade-out class to trigger CSS transition
				splash.classList.add("fade-out");

				// Remove element from DOM after transition finishes (400ms match CSS)
				const removeTimer = setTimeout(() => {
					splash.remove();
				}, 400);

				return () => clearTimeout(removeTimer);
			}, 3000);

			return () => clearTimeout(fadeTimer);
		}
	}, []);

	return (
		// Add padding top safe and padding bottom safe
		<div className="max-h-dvh bg-background text-main-color antialiased pt-safe-or-5 pb-safe-or-5 overflow-scroll">
			<Router>
				<DataProvider>
					<Routes>
						<Route path="/" exact element={<Auth />} />{" "}
						{/* Default page = authentication */}
						<Route path="home" element={<Home />} /> {/* Home page */}
						<Route path="accounts" element={<Accounts />} />{" "}
						{/* Accounts  page */}
						<Route path="settings" element={<Settings />} />
						<Route path="settings/categories" element={<Categories />} />{" "}
						{/* Categories page */}
						{/* Add the forms page to add a new expense */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</DataProvider>
			</Router>
		</div>
	);
}

export default App;
