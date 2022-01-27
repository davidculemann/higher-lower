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
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route
          path="/"
          element={<HomeScreen category={category} setCategory={setCategory} />}
        />
        <Route
          path="play"
          element={
            <GameScreen category={category} loggedInUser={loggedInUser} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
