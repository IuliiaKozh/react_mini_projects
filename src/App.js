import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MyComponent from './MyComponent';
import Countdown from './Countdown';
import Task8 from './Task8';
import NameInput from './NameInput';
import DarkTheme from './DarkTheme';
import ShoppingList from './ShoppingList';
import CountHistory from './CountHistory';
import PomodoroTimer from './PomodoroTimer';
import Notes from './Notes';
import Profil from './Profil';
import Quiz from './Quiz';
import Dictionary from './Dictionary';
import HabitTracker from './HabitTracker';

function App() {
  return (
    <Router>
      <div className="App">

        {/* 🔹 Меню навигации */}
        <nav style={{ marginBottom: 20 }}>
          <Link to="/profile">Profile</Link> |{' '}
          <Link to="/quiz">Quiz</Link> |{' '}
          <Link to="/dictionary">Dictionary</Link> |{' '}
          <Link to="/habits">Habit Tracker</Link> |{' '}
          <Link to="/notes">Notes</Link> |{' '}
          <Link to="/pomodoro">Pomodoro</Link> |{' '}
          <Link to="/shopping">Shopping</Link>
        </nav>

        {/* 🔹 Роуты */}
        <Routes>
          <Route path="/" element={<Profil />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/shopping" element={<ShoppingList />} />

          {/* дополнительные проекты */}
          <Route path="/task8" element={<Task8 />} />
          <Route path="/name-input" element={<NameInput />} />
          <Route path="/dark-theme" element={<DarkTheme />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/count-history" element={<CountHistory />} />

          {/* fallback */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;