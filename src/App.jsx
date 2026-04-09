import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { Accounts } from "./pages/accounts/index";
import { Auth } from "./pages/auth/index";
import { Home } from "./pages/home/index";
import { Categories } from "./pages/settings/categories/index";
import { Settings } from "./pages/settings/index";

function App() {
	return (
		// Add padding top safe and padding bottom safe
		<div className="h-dvh bg-background text-main-color antialiased pt-safe-or-5 pb-safe-or-5 overflow-hidden">
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
					</Routes>
				</DataProvider>
			</Router>
		</div>
	);
}

export default App;
