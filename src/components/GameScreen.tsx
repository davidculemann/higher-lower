import axios from "axios";
import { config } from "dotenv";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { CountryType } from "../utils/types/countryType";
import { restcountriesURL } from "../utils/apiURL";
import { getTwoRandomInts } from "../utils/getTwoRandomInts";
import { readableNumber } from "../utils/readableNumber";
import { GeoFooter } from "./GeoFooter";
import { useSound } from "use-sound";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.wav";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im";
//MUI dialog imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DialogTitle } from "@material-ui/core";
import Stack from "@mui/material/Stack/Stack";

interface GameScreenProps {
  category: string;
  loggedInUser: string;
}

config();
const serverBaseURL = process.env.REACT_APP_API_BASE;

export function GameScreen(props: GameScreenProps): JSX.Element {
  const [countries, setCountries] = useState<CountryType[] | null>(null);
  const [score, setScore] = useState<number>(0);
  const [initialised, setInitialised] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<CountryType[] | null>(
    null
  );
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [soundSetting, setSoundSetting] = useState<boolean>(true);

  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);

  const handleFetchCountries = useCallback(() => {
    axios
      .get(`${restcountriesURL}all?fields=name,area,population,flags`)
      .then((response) => {
        const responseData = response.data;
        const countryFields: CountryType[] = responseData.map(
          (country: {
            name: { common: string };
            area: number;
            population: number;
            flags: { svg: string };
          }) => ({
            name: country.name.common,
            area: country.area,
            population: country.population,
            flag: country.flags.svg,
          })
        );
        setCountries(countryFields);
        setInitialised(!initialised);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchCountries();
  }, [handleFetchCountries]);

  useEffect(() => {
    createOptionArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialised]);

  const handlePostScore = async () => {
    await axios.post(`${serverBaseURL}scores`, {
      name: props.loggedInUser,
      score: score,
      category: `Geography (${props.category})`,
    });
  };

  const handleRestartGame = () => {
    setScore(0);
    handleFetchCountries();
    createOptionArr();
  };

  const handleGuess = (higher: boolean, subcategory: string) => {
    console.log("user tried to guess");
    if (subcategory === "area" && countryOptions) {
      if (
        (higher && countryOptions[1].area >= countryOptions[0].area) ||
        (!higher && countryOptions[1].area <= countryOptions[0].area)
      ) {
        //correct!
        soundSetting && playCorrect();
        console.log("guessed correct!");
        createOptionArr();
        setScore(score + 1);
      } else {
        //terminate game
        soundSetting && playWrong();
        handlePostScore();
        setOpenAlert(true);
      }
    } else if (subcategory === "population" && countryOptions) {
      if (
        (higher &&
          countryOptions[1].population >= countryOptions[0].population) ||
        (!higher &&
          countryOptions[1].population <= countryOptions[0].population)
      ) {
        //correct!
        soundSetting && playCorrect();
        console.log("guessed correct!");
        createOptionArr();
        setScore(score + 1);
      } else {
        //terminate game
        soundSetting && playWrong();
        handlePostScore();
        setOpenAlert(true);
      }
    }
  };

  function createOptionArr() {
    console.log("attempting to create options arr");
    console.log(countries);
    if (countries !== null) {
      if (countryOptions === null) {
        //initialise for game start
        const startIndices = getTwoRandomInts(countries.length);
        const startOptions = startIndices.map((element) => countries[element]);
        setCountryOptions(startOptions);
        //Filter out options from countries so future options are all unique
        setCountries(
          countries.filter((el, index) => !startIndices.includes(index))
        );
        console.log("initialised options arr");
      } else {
        //shuffle after a correct guess
        const newCountryIndex = getTwoRandomInts(countries.length)[0];
        console.log(newCountryIndex);
        setCountryOptions([countryOptions[1], countries[newCountryIndex]]);
        setCountries(
          countries.filter((el, index) => index !== newCountryIndex)
        );
        console.log("shuffled options arr");
      }
    }
  }

  const handleClose = (reason: string) => {
    if (reason !== "backdropClick") {
      setOpenAlert(false);
    }
  };

  return (
    <div className="game-screen">
      <Stack
        display="flex"
        spacing={2}
        direction="row"
        m={3}
        alignItems="center"
      >
        <Link to="/">
          <Button variant="contained">Home</Button>
        </Link>
        {soundSetting ? (
          <ImVolumeMedium
            className="volume"
            onClick={() => setSoundSetting(!soundSetting)}
          />
        ) : (
          <ImVolumeMute2
            className="volume"
            onClick={() => setSoundSetting(!soundSetting)}
          />
        )}
        <h3>(category: {props.category})&nbsp;&nbsp;</h3>
        <h2>score: {score}</h2>
      </Stack>
      {countryOptions && (
        <div className="options-panel">
          <div className="left-option">
            <div className="country-info">
              <h2>{countryOptions[0].name}</h2>
              {props.category === "population" && (
                <h3>
                  population {readableNumber(countryOptions[0].population)}
                </h3>
              )}
              {props.category === "area" && (
                <h3>
                  area {readableNumber(countryOptions[0].area)} km<sup>2</sup>{" "}
                </h3>
              )}
            </div>
            <img
              key={countryOptions[1].name}
              src={countryOptions[0].flag}
              alt={`country flag of ${countryOptions[0].name}`}
            />
          </div>
          <div className="right-option">
            <div className="country-info">
              <h2>{countryOptions[1].name}</h2>
              {props.category === "population" && openAlert ? (
                <h2>
                  population {readableNumber(countryOptions[1].population)}
                </h2>
              ) : (
                props.category === "population" && <h3>population ???</h3>
              )}
              {props.category === "area" && openAlert ? (
                <h3>
                  area {readableNumber(countryOptions[1].area)} km<sup>2</sup>
                </h3>
              ) : (
                props.category === "area" && <h3>area ???</h3>
              )}
            </div>
            <img
              key={countryOptions[1].name}
              src={countryOptions[1].flag}
              alt={`country flag of ${countryOptions[1].name}`}
            />
            <Stack spacing={2} direction="row" m={3} justifyContent="center">
              <Button
                className="higher-button"
                style={{ fontSize: "1em", backgroundColor: "#179825" }}
                variant="contained"
                onClick={() => handleGuess(true, props.category)}
              >
                Higher
              </Button>
              <Button
                className="lower-button"
                style={{ fontSize: "1em", backgroundColor: "#ee1e06" }}
                variant="contained"
                onClick={() => handleGuess(false, props.category)}
              >
                Lower
              </Button>
            </Stack>
          </div>
        </div>
      )}
      <Dialog
        open={openAlert}
        onClose={() => handleClose("backdropClick")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"GAME OVER"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your score: {score}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button onClick={() => setOpenAlert(false)}>Main menu</Button>
          </Link>
          <Button
            onClick={() => {
              handleRestartGame();
              setOpenAlert(false);
            }}
            autoFocus
          >
            Restart
          </Button>
        </DialogActions>
      </Dialog>
      <GeoFooter />
    </div>
  );
}
