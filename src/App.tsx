import "./App.css";
import { GameScreen } from "./components/GameScreen";
import { HomeScreen } from "./components/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// config();
//const serverBaseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
