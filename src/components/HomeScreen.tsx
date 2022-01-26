import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface HomeScreenProps {
  category: string;
  setCategory: (input: string) => void;
}

export function HomeScreen(props: HomeScreenProps): JSX.Element {
  return (
    <div className="home-screen">
      <div className="game-options">
        <h2>Game category:</h2>
        <FormControl>
          {/* <FormLabel id="demo-radio-buttons-group-label">
            Game category
          </FormLabel> */}
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={props.category}
            onChange={(e) => props.setCategory(e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel value="area" control={<Radio />} label="Area" />
            <FormControlLabel
              value="population"
              control={<Radio />}
              label="Population"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Link to="/play">
        <Button
          variant="contained"
          style={{ fontSize: "25px" }}
          onClick={() => console.log(props.category)}
        >
          Play
        </Button>
      </Link>
    </div>
  );
}
