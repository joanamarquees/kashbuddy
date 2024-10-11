import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { Expenses } from './pages/expenses/index';
import { Home } from './pages/home/index';
import { Accounts } from './pages/accounts/index';

function App() {
  return (
    <div className="h-full bg-zinc-900 text-zinc-50 antialiased py-8">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} /> {/* Default page = authentication */}
          <Route path="home" element={<Home />} /> {/* Home page */}
          <Route path="expenses" element={<Expenses />} /> {/* Expenses page */}
          <Route path="accounts" element={<Accounts />} /> {/* Accounts  page */}
          {/* Add the forms page to add a new expense */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
