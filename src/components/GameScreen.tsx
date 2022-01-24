import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CountryType } from "../utils/types/countryType";
import { restcountriesURL } from "../utils/apiURL";
import { getRandomInt } from "../utils/getRandomInt";

export function GameScreen(): JSX.Element {
  const [countries, setCountries] = useState<CountryType[] | null>(null);
  const [randomIndex, setRandomIndex] = useState<number>(0);

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
      });
  }, []);

  useEffect(() => {
    handleFetchCountries();
  }, [handleFetchCountries]);

  return (
    <div>
      {countries && (
        <div>
          <button onClick={() => setRandomIndex(getRandomInt(250))}>
            Fetch countries
          </button>
          <p>{countries && countries[randomIndex].name}</p>
          <p>{countries && countries[randomIndex]?.population}</p>
          <p>{countries && countries[randomIndex]?.area}</p>
          <img
            src={countries && countries[randomIndex]?.flag}
            alt={"country flag"}
          />
        </div>
      )}
    </div>
  );
}
