import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { Expenses } from './pages/expenses/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} /> {/* Default page = authentication */}
          <Route path="expenses" element={<Expenses />} /> {/* Expenses page */}
          {/* Add the forms page to add a new expense */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
