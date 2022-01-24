import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { config } from "dotenv";
import { restcountriesURL } from "./utils/apiURL";

config();

const serverBaseURL = process.env.REACT_APP_API_BASE;

interface CountryType {
  name: { common: string };
  area: number;
  population: number;
  flags: { svg: string };
}

function App(): JSX.Element {
  const [countries, setCountries] = useState<Partial<CountryType[]>>([
    {
      name: { common: "none loaded" },
      area: 0,
      population: 0,
      flags: { svg: "" },
    },
  ]);

  const handleFetchCountries = () => {
    axios.get(`${restcountriesURL}all`).then((response) => {
      const fetchedCountries = response.data;
      setCountries(fetchedCountries);
    });

    console.log("button was clicked, trying to get data");
    console.log(countries.length);
    console.log(countries);
  };

  useEffect(handleFetchCountries, []);

  return (
    <div>
      <button onClick={() => handleFetchCountries()}>Fetch countries</button>
      <p>{countries[0]?.name.common}</p>
      <p>{countries[0]?.population}</p>
      <p>{countries[0]?.area}</p>
      <img src={countries[0]?.flags.svg} />
    </div>
  );
}

export default App;
