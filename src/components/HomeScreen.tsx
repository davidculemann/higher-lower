import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { RiArrowUpDownLine } from "react-icons/ri";
import { useState } from "react";

export function HomeScreen(): JSX.Element {
  const [category, setCategory] = useState<string>("area");

  return (
    <div>
      <h1 className="home-header">
        Higher Lower<span>&nbsp;</span>
        <RiArrowUpDownLine />
      </h1>
      <Link to="/game">
        <Button variant="contained" onClick={() => console.log(category)}>
          Play
        </Button>
      </Link>
      <div className="game-options">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Game category
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel value="area" control={<Radio />} label="area" />
            <FormControlLabel
              value="population"
              control={<Radio />}
              label="population"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
