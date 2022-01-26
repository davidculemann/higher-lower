import "./App.css";
import { GameScreen } from "./components/GameScreen";
import { HomeScreen } from "./components/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useState } from "react";

// config();
//const serverBaseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  const [category, setCategory] = useState<string>("area");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomeScreen category={category} setCategory={setCategory} />}
        />
        <Route path="play" element={<GameScreen category={category} />} />
      </Routes>
    </Router>
  );
}

export default App;
