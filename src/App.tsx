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
  const [time, setTime] = useState<number>(30);
  const [toggleTimer, setToggleTimer] = useState<boolean>(false);

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              category={category}
              setCategory={setCategory}
              toggleTimer={toggleTimer}
              setToggleTimer={setToggleTimer}
            />
          }
        />
        <Route
          path="play"
          element={
            <GameScreen
              category={category}
              loggedInUser={loggedInUser}
              time={time}
              setTime={setTime}
              toggleTimer={toggleTimer}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
