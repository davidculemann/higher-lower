import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CountryType } from "../utils/types/countryType";
import { restcountriesURL } from "../utils/apiURL";
import { getTwoRandomInts } from "../utils/getTwoRandomInts";
//MUI dialog imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export function GameScreen(): JSX.Element {
  const [countries, setCountries] = useState<CountryType[] | null>(null);
  const [score, setScore] = useState<number>(0);
  const [initialised, setInitialised] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<CountryType[] | null>(
    null
  );
  const [openAlert, setOpenAlert] = useState<boolean>(false);

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
        setInitialised(true);
      });
  }, []);

  useEffect(() => {
    handleFetchCountries();
  }, [handleFetchCountries]);

  useEffect(() => {
    createOptionArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialised]);

  const handleEndGame = () => {
    console.log("guessed wrong :(");
    setOpenAlert(true);
  };

  const handleRestartGame = () => {
    setScore(0);
    handleFetchCountries();
    setCountryOptions(null);
    setInitialised(!initialised);
  };

  const handleGuess = (higher: boolean, subcategory: string) => {
    console.log("user tried to guess");
    if (subcategory === "area" && countryOptions) {
      if (
        (higher && countryOptions[1].area > countryOptions[0].area) ||
        (!higher && countryOptions[1].area < countryOptions[0].area)
      ) {
        //correct!
        console.log("guessed correct!");
        createOptionArr();
        setScore(score + 1);
      } else {
        //terminate game
        handleEndGame();
      }
    } else if (countryOptions) {
      if (
        (higher &&
          countryOptions[1].population > countryOptions[0].population) ||
        (!higher && countryOptions[1].population < countryOptions[0].population)
      ) {
        //correct!
        console.log("guessed correct!");
        createOptionArr();
        setScore(score + 1);
      } else {
        //terminate game
        handleEndGame();
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

  return (
    <div>
      <>
        <Dialog
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Well done! you scored {score}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAlert(false)}>Main menu</Button>
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
      </>

      <button onClick={() => handleGuess(true, "area")}>Higher</button>
      <button onClick={() => handleGuess(false, "area")}>Lower</button>
      <p>score: {score}</p>
      {countryOptions && (
        <div id="options">
          <div id="left-option">
            <p>{countryOptions[0].name}</p>
            <p>population {countryOptions[0].population}</p>
            <p>area {countryOptions[0].area}</p>
            <img
              src={countryOptions[0].flag}
              alt={`country flag of ${countryOptions[0].name}`}
            />
          </div>
          <div id="right-option">
            <p>{countryOptions[1].name}</p>
            <p>population {countryOptions[1].population}</p>
            <p>area: ???</p>
            {/* <p>{countryOptions[1].area}</p> */}
            <img
              src={countryOptions[1].flag}
              alt={`country flag of ${countryOptions[1].name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
