import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { Home } from './pages/home/index';
import { Accounts } from './pages/accounts/index';
import { Settings } from './pages/settings/index';
import { Categories } from './pages/settings/categories/index';

function App() {
  return (
    <div className="h-full bg-zinc-900 text-zinc-50 antialiased pb-8">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} /> {/* Default page = authentication */}
          <Route path="home" element={<Home />} /> {/* Home page */}
          <Route path="accounts" element={<Accounts />} /> {/* Accounts  page */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/categories" element={<Categories />} /> {/* Categories page */}
          {/* Add the forms page to add a new expense */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
